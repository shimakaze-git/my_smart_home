const accessKeyId = '20X5ROEJD9NMHIVM381C'
const secretAccessKey = 'Zsj9136OeI6HbRIZCnovqdjsLTIEGQmf88gJRvVP'

const clientId = process.env.CLIENT_ID || '1656312876'
const TMP = process.env.TMP || '/tmp'

const DB_HOST =
  process.env.PLANETSCALE_DB_HOST || 'pq1lwsw6eg33.us-west-2.psdb.cloud'
const DB_USER = process.env.PLANETSCALE_DB_USERNAME || 'mrx5ckw0swta'
const DB_PASSWORD =
  process.env.PLANETSCALE_DB_PASSWORD ||
  'pscale_pw_NzO3x4GieRdFdMHW004q-h0KwXUhxw_aNtawKS6g9XM'
const DB_NAME = process.env.PLANETSCALE_DB || 'call-platform'
const DB_CA_PATH = process.env.PLANETSCALE_SSL_CERT_PATH || '/etc/ssl/cert.pem'

module.exports = {
  accessKeyId,
  secretAccessKey,
  TMP,
  clientId,
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CA_PATH,
}
