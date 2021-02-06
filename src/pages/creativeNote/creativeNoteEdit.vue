<template>
  <div>
    <div v-if="loading">
      <Spin>
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </Spin>
    </div>
    <div v-else>
      <div></div>
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
                <Input v-model="taskTitle" search enter-button="新增任务" @on-search="onNewTask"/>
                  <div v-for="(item, index) in tasks" :key="index">
                    <div class="task_view">
                      <div class="task_check_view">
                        <Checkbox v-model="item.complete">Checkbox</Checkbox>
                      </div>
                      <div class="task_title_view">
                        <div class="un_complete">
                          未完成的任务
                        </div>
                        <div class="complete">
                          已完成的任务
                        </div>
                      </div>
                      <div class="task_bt_view">
                        <Button type="error">删除</Button>
                      </div>
                    </div>
                  </div>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>

      <Button type="primary" @click="onSave">保存</Button>
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

    export default {
        name: "creativeNoteEdit",
        components: {
            quillEditor
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
                keys: -1,
                editing: false,
                saving: false,
                loading: true,
                tasks: [],
                taskTitle: ''
            }
        },
        methods: {
            loadAllData() {
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
                console.log(this.taskTitle)
                let task = {
                    taskTitle: this.taskTitle
                }
                this.tasks.push(task)
            },
            onDeleteTask(item,index) {
                console.log(item)
              console.log(index)
              this.tasks.splice(index, 1)
            },
            onSave() {
                console.log(this.detail1)
                console.log(this.detail2)
                console.log(this.detail3)

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
                    categoryId: this.$store.state.category_id
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
                                this.$Message.info(this.$t('common.btSaveSuccess'))
                                this.saving = false
                                this.editing = false
                                this.keys = 0
                            } else {
                                this.$Message.error(this.$t('common.btSaveFailed'))
                                this.saving = false
                            }
                        }).catch((error) => {
                            this.saving = false
                        })
                    }
                })
            }
        },
        mounted() {
            this.loadAllData()
        }
    }
</script>

<style scoped>
  .card {
    margin: 10px;
  }
</style>
