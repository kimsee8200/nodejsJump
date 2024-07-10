let template = {
    html: function (title, list, body, control) {
        return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
          ${list}
          ${control}
          ${body}
        </body>
      </html>
      `
    },
    list: function (files) {
        let list = '<ul>'
        let i = 0
        while (i < files.length) {
            list = list + `<li><a href="/page/${files[i]}">${files[i]}</a></li>`
            i++
        }
        return list = list + '</ul>'
    }
}


module.exports = template