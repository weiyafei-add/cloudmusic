// 工具组件
export const getCount = (count) => {
  if (count < 0) return
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return Math.floor(count / 100000000) + '亿'
  }
}

// 防抖处理
export const debounce = (func, delay) => {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
      clearTimeout(timer)
    }, delay)
  }
}
// 过滤数据, 找出第一个没有歌名的排行榜的索引
export const filterIndex = (rankList) => {
  for (let i = 0; i < rankList.length - 1; i++) {
    if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
      return i + 1
    }
  }
}
// 拼接名字
export const getName = (ar, al) => {
  if (!al) {
    return ar[0].name + ''
  }
  let string = ''
  if (ar.length === 1) {
    string += ar[0].name
  } else {
    ar.forEach((item, index) => {
      if (index === ar.length - 1) {
        string = string + item.name
        return
      }
      string = string + item.name + '/'
    })
  }
  string = `${string} - ${al.name}`
  return string
}
// 判断对象是否非空
export const isEmptyObject = (obj) => !obj || Object.keys(obj).length === 0

// 判断是哪种浏览器
// 先创建一个div获取到样式
let elementStyle = document.createElement('div').style

let vender = (() => {
  // 首先通过trnasform属性判断是哪种浏览器
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'Transform',
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
    return false
  }
})()

export function prefixStyle(style) {
  if (vender === false) {
    return false
  }
  if (vender === 'standard') {
    return style
  }

  return vender + style.charAt(0).toUpperCase() + style.substr(1)
}
// 拼接出歌曲的url链接
export const getSongUrl = (id) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
// 格式化播放时间
export const formatPlayTime = (interval) => {
  interval = interval | 0
  const minute = (interval / 60) | 0
  const second = (interval % 60).toString().padStart(2, 0)
  return `${minute}:${second}`
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let new_arr = []
  arr.forEach((item) => {
    new_arr.push(item)
  })
  for (let i = 0; i < new_arr.length; i++) {
    let j = getRandomInt(0, i)
    console.log(j)
    let t = new_arr[i]
    new_arr[i] = new_arr[j]
    new_arr[j] = t
  }
  return new_arr
}

// 找到当前的歌曲索引
export function FindIndex(song, list) {
  return list.findIndex((item) => {
    return song.id === item.id
  })
}
