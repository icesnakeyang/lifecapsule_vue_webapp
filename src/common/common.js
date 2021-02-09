export const taskImportant=params=>{
  if(params==='DEFAULT'){
    return '默认'
  }
  if(params==='IMPORTANT_AND_URGENT'){
    return '重要且紧急'
  }
  if(params==='IMPORTANT_NOT_URGENT'){
    return '重要不紧急'
  }
  if(params==='URGENT_NOT_IMPORTANT'){
    return '紧急不重要'
  }
  if(params==='NOTHING'){
    return '不重要不紧急'
  }
}

export const taskType=params=>{
  if(params==='ACTION_10_SEC'){
    return '十秒行动计划'
  }
  return ''
}
