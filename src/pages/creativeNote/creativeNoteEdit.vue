<template>
  <div>
    <div v-if="loading">
      <Spin>
        <Icon type="ios-loading" size=18 class="gogo_spin"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
    <div v-else>
      <div>
        <Form>
          <FormItem label="笔记标题" @submit.native.prevent>
            <Input v-model="noteTitle"
                   onkeypress="if(event.keyCode == 13) return false;"
                   @on-change="onNoteTitleChange"/>
          </FormItem>
          <p>创建时间：{{ noteCreateTime }}</p>
        </Form>
      </div>
      <Row>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          <Card class="card">
            <p slot="title">昨天最高兴的三件事</p>
            <Form>
              <FormItem>
                <quill-editor v-model="detail1"
                              :options="editorOption"
                              @change="onEditorChange"
                ></quill-editor>
              </FormItem>
            </Form>
          </Card>
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          <Card class="card">
            <p slot="title">我的感受</p>
            <Form>
              <FormItem>
                <quill-editor v-model="detail2"
                              :options="editorOption"
                              @change="onEditorChange"
                ></quill-editor>
              </FormItem>
            </Form>
          </Card>
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          <Card class="card">
            <p slot="title">今天要做的事情</p>
            <Form>
              <FormItem>
                <quill-editor v-model="detail3"
                              :options="editorOption"
                              @change="onEditorChange"
                ></quill-editor>
              </FormItem>
            </Form>
          </Card>
        </Col>
        <Col :xs="24" :sm="24" :md="12" :lg="12">
          <Card class="card">
            <p slot="title">10秒行动任务</p>
            <Form>
              <FormItem>
                <Input v-model="taskTitle" search enter-button="新增任务"
                       onkeypress="if(event.keyCode == 13) return false;"
                       @on-search="onNewTask"/>
                <div v-for="(item, index) in tasks" :key="index" style="margin-top: 10px">
                  <CreativeNoteTaskRow :theData="{item,index}"
                                       v-on:onUpdateTask="onUpdateTask"
                                       v-on:onDeleteTask="onDeleteTask"/>
                </div>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>

      <div v-if="editing">
        <div v-if="saving">
          <Button type="primary" loading>保存中...</Button>
        </div>
        <div v-else>
          <Button type="primary" @click="onSave">保存</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import {Decrypt, Decrypt2, Encrypt, GenerateKey, GenerateRandomString16, RSAencrypt} from "../../plugins/crypto";
import CryptoJS from "crypto-js";
import {apiGetCreativeNote, apiGetNote, apiRequestRSAPublicKey, apiSaveCreativeNote} from "../../api/api";
import CreativeNoteTaskRow from './creativeNoteTaskRow'
import moment from "moment";

export default {
  name: "creativeNoteEdit",
  components: {
    quillEditor,
    CreativeNoteTaskRow
  },
  data() {
    return {
      noteId: null,
      note: {},
      creativeNoteList: {},
      detail1: null,
      detail2: null,
      detail3: null,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{
              list: 'ordered'
            },
              {
                list: 'bullet'
              }],
            [
              {
                color: []
              },
              {
                background: []
              }
            ],
            [
              {
                align: []
              }
            ],
            [
              {
                header: [1, 2, 3, 4, 5, 6, false]
              }
            ],
          ],
          imageResize: true
        },
        placeholder: this.$t('note.detailHolder')
      },
      keys: 0,
      editing: false,
      saving: false,
      loading: true,
      tasks: [],
      taskTitle: '',
      noteTitle: ''
    }
  },
  computed: {
    noteCreateTime() {
      if (this.note && this.note.createdTime) {
        return moment(this.note.createdTime).format('YYYY-MM-DD HH:mm')
      }
      return ''
    }
  },
  methods: {
    loadAllData() {
      if (!this.$store.state.note_id) {
        this.loading = false
        return
      }
      this.loading = true
      let params = {
        noteId: this.$store.state.note_id,
      }

      /**
       * 请求一个RSA公钥
       * 生成一个AES秘钥
       * 用RSA公钥加密AES秘钥，发送到服务器
       * 服务器用私钥解密AES，加密note的AES，发送回前端
       * 前端用AES解开note的AES
       * 用解开的note的AES解开detail
       *
       */

      apiRequestRSAPublicKey().then((response) => {
        if (response.data.code === 0) {
          const keyAES_1 = GenerateRandomString16();
          params.encryptKey = RSAencrypt(keyAES_1, response.data.data.publicKey)
          params.keyToken = response.data.data.keyToken
          apiGetCreativeNote(params).then((response) => {
            if (response.data.code === 0) {
              this.noteId = response.data.data.note.noteId
              this.note = response.data.data.note
              this.creativeNoteList = response.data.data.creativeNoteList
              let strKey = this.note.userEncodeKey
              strKey = Decrypt2(strKey, keyAES_1)
              for (let i = 0; i < this.creativeNoteList.length; i++) {
                if (this.creativeNoteList[i].creativeType === 'CREATIVE1') {
                  this.detail1 = Decrypt(this.creativeNoteList[i].content, strKey, strKey)
                }
                if (this.creativeNoteList[i].creativeType === 'CREATIVE2') {
                  this.detail2 = Decrypt(this.creativeNoteList[i].content, strKey, strKey)
                }
                if (this.creativeNoteList[i].creativeType === 'CREATIVE3') {
                  this.detail3 = Decrypt(this.creativeNoteList[i].content, strKey, strKey)
                }
              }
              this.tasks = response.data.data.taskList
              this.noteTitle = response.data.data.note.title
            }
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    onEditorChange() {
      this.keys++
      if (this.keys > 0) {
        this.editing = true
      }
    },
    onNewTask() {
      let task = {
        taskTitle: this.taskTitle,
        complete: false
      }
      this.tasks.push(task)
      this.taskTitle = ''
      this.keys++
      if (this.keys > 0) {
        this.editing = true
      }
    },
    onDeleteTask(data) {
      this.tasks.splice(data.index, 1)
      this.editing = true
    },
    onUpdateTask(data) {
      this.tasks.splice(data.index, 1, data.item)
      this.editing = true
    },
    onSave() {
      /**
       * 请求一个RSA公钥
       * 生成一个AES秘钥
       * 用RSA公钥加密AES秘钥，发送到服务器
       * 服务器用私钥解密AES，加密note的AES，发送回前端
       * 前端用AES解开note的AES
       * 用解开的note的AES解开detail
       *
       */

      /**
       * 本地随机生成一个uuid作为钥匙：key_UUID
       */
      const key_UUID = GenerateKey()
      /**
       * 把这个key_UUID用SHA256算法转换成哈希值：key_UUID_256
       */
      const key_UUID_256 = CryptoJS.SHA256(key_UUID);
      /**
       * 把这个key_UUID_256转成base64格式
       */
      const key_UUID_256_base64 = CryptoJS.enc.Base64.stringify(key_UUID_256)

      let params = {
        noteId: this.noteId,
        /**
         * 用这个key_UUID_256_base64作为秘钥和补码，用AES算法加密笔记内容
         */
        detail1: Encrypt(this.detail1, key_UUID_256_base64, key_UUID_256_base64),
        detail2: Encrypt(this.detail2, key_UUID_256_base64, key_UUID_256_base64),
        detail3: Encrypt(this.detail3, key_UUID_256_base64, key_UUID_256_base64),
        /**
         * key_UUID_256_base64秘钥需要保存到服务器上
         */
        encryptKey: key_UUID_256_base64,
        categoryId: this.$store.state.category_id,
        tasks: this.tasks,
        noteTitle: this.noteTitle
      }

      /**
       * 从服务器请求一个RSA公钥
       */
      apiRequestRSAPublicKey().then((response) => {
        if (response.data.code === 0) {
          /**
           * 用服务器生成的RSA公钥来加密本地的AES秘钥key_UUID_256_base64
           */
          params.encryptKey = RSAencrypt(params.encryptKey, response.data.data.publicKey)
          /**
           * 服务器端的RSA私钥对应的token
           */
          params.keyToken = response.data.data.keyToken

          this.saving = true
          apiSaveCreativeNote(params).then((response) => {
            if (response.data.code === 0) {
              this.noteId=response.data.data.note.noteId
              this.$Message.info(this.$t('common.btSaveSuccess'))
              this.saving = false
              this.editing = false
              this.keys = 0
            } else {
              this.$Message.error(this.$t('common.btSaveFailed'))
              this.saving = false
            }
          }).catch((error) => {
            this.$Message.error(this.$t('syserr.10001'))
            this.saving = false
          })
        }
      })
    },
    onNoteTitleChange() {
      this.keys++
      if (this.keys > 0) {
        this.editing = true
      }
    }
  },
  mounted() {
    this.loadAllData()
  }
}
</script>

<style scoped>
@import "../../assets/gogoStyle.css";

.card {
  margin: 10px;
}
</style>
