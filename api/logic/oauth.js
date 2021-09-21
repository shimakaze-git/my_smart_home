import axios from 'axios'
const { createAccessToken, getUserProfile } = require('./user')

// mysqlConnection.jsで作成したconnectionを呼び出す
const connection = require('./db')

// getUserProfile

// const { TMP } = require('./config')
// const { s3Client } = require('./storage')

// const AddThumbnail = async (thumbnail) => {
//   const filename = thumbnail.split('/').slice(-1)[0]
//   const writeFileName = TMP + '/' + filename

//   await axios.get(thumbnail, { responseType: 'arraybuffer' }).then((res) => {
//     const buf = Buffer.from(res.data)
//     fs.writeFileSync(writeFileName, buf, 'binary')
//   })

//   if (fs.existsSync(writeFileName)) {
//     const readStream = fs.createReadStream(writeFileName)
//     const bucketName = 'chijodougaclub'
//     const params = {
//       Bucket: bucketName,
//       Key: 'thumbnail/' + filename,
//       Body: readStream,
//     }

//     // 画像をアップロードする.
//     return new Promise((resolve, reject) => {
//       s3Client().upload(params, (err, data) => {
//         readStream.destroy()
//         if (!err) {
//           fs.unlinkSync(writeFileName)

//           console.log(data)
//           resolve(data.Location)
//         } else {
//           console.log(err, err.stack)
//           reject(err.stack)
//         }
//       })
//     })
//   }
// }

// const AddThumbnailHttp = async (req, res) => {
//   if (req.body) {
//     const thumbnail = req.body.thumbnail
//     // サムネイルの保存
//     if (thumbnail) {
//       const thumbnailPath = await AddThumbnail(thumbnail)
//       console.log('thumbnailPath', thumbnailPath)
//       return res.json({
//         path: thumbnailPath,
//       })
//     }
//   } else {
//     return res.status(400)
//   }
// }

const oauthSocialLineState = (req, res) => {
  console.log('oauthSocialLineState req')

  connection.query('SELECT VERSION()', (err, results, fields) => {
    if (err) throw err

    for (const result of results) {
      console.log('result', result)
    }

    // console.log('rows', results)
    console.log('fields', fields)
  })

  const state = Math.random().toString(36).substring(2)
  return res.json({
    state,
  })
}

const oauthSocialLineCallback = async (req, res) => {
  try {
    const accessTokenData = await createAccessToken(req.body)

    const accessToken = accessTokenData.access_token
    const idToken = accessTokenData.id_token
    const userProfile = await getUserProfile(accessToken, idToken)

    return res.json({
      user: userProfile,
      accessToken: {
        access_token: accessToken,
        id_token: idToken,
      },
    })
  } catch (error) {
    console.error(error)
    res.status(400)
  }
}

const validationAccessToken = (accessToken) => {
  return new Promise((resolve, reject) => {
    let apiUrl = 'https://api.line.me/oauth2/v2.1/verify'
    apiUrl += '?access_token=' + accessToken

    axios
      .get(apiUrl)
      .then((res) => {
        const expiresIn = res.data.expires_in
        const dateTime = new Date(Date.now() + expiresIn)
        // 有効期限が切れていないかをチェックする.
        if (dateTime > new Date(Date.now())) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

const oauthSocialLineSignup = async (req, res) => {
  // console.log('oauthSocialLineSignup', req.body)
  // console.log('session', req.session)
  // console.log('req.body.user', req.body.user)

  if (req.body.user && req.body.accessToken) {
    // console.log('session', req.body.accessToken)

    try {
      const rStatus = await validationAccessToken(
        req.body.accessToken.access_token
      )

      if (!rStatus) {
        return res.status(401).json({ message: 'none validated access_token' })
      }

      console.log('req.body.accessToken', req.body.accessToken)
      console.log('req.body.user', req.body.user)
      // Ue714910418932aa7caa4d12caa45776d
    } catch (error) {
      return res.status(401).json({ message: error.data.error_description })
    }

    // セッションにつめる
    req.session.authUser = req.body.user
    // req.session.authUser = req.body.authUser

    // レスポンスはそのまま返す
    // return res.json(req.body.user)
    return res.status(201).json(req.body.user)
  }
  return res.status(401).json({ message: 'Bad credentials' })
}

module.exports = {
  oauthSocialLineState,
  oauthSocialLineCallback,
  oauthSocialLineSignup,
}

// mysql -h pq1lwsw6eg33.us-west-2.psdb.cloud -u 10e3ixuwg4yr -ppscale_pw_DGNKrtT41_y7qdc1wQq_9IM55qyVH-p3U77buRNd7NI --ssl-mode=VERIFY_IDENTITY --ssl-ca=/etc/ssl/cert.pem
