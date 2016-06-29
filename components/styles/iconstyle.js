export const extensions = [
  'aac', 'aiff', 'ai', 'avi', 'bmp', 'c', 'cpp', 'css', 'dat', 'dmg', 'doc',
  'docx', 'dotx', 'dwg', 'dxf', 'eps', 'exe', 'flv', 'gif', 'h', 'hpp', 'html',
  'ics', 'iso', 'java', 'jpg', 'js', 'key', 'less', 'mid', 'mp3', 'mp4', 'mpg',
  'msi', 'odf', 'ods', 'odt', 'otp', 'ots', 'ott', 'pdf', 'php', 'png', 'ppt',
  'psd', 'py', 'qt', 'rar', 'rb', 'rtf', 'sass', 'scss', 'sql', 'tga', 'tgz',
  'tiff', 'txt', 'wav', 'xls', 'xlsx', 'xml', 'yml', 'zip', '_blank'
]

var _IconStyle = {
  default: {
    margin: '0px',
    padding: '20px 20px 20px 40px',
    fontWeight: 'bold',
    color: '#006ab2'
  }
}

for(let ext in extensions) {
  let e = extensions[ext]
  let bg = '#fdfdfd url(/dropbox/static/images/' + e + '.png) 5px center no-repeat';
  _IconStyle[e] = {background: bg}
}

export const IconStyle = _IconStyle
