var request = require('request');
var config = require('../config.js');
var pool = require('../models/pool.js');
var fs = require('fs');

exports.showBackstage= function (request, response, next) {
  response.render( 'backstage');
};

exports.bookInfo = function (request, response, next) {
  var address = "";
  var name = "";
  if(request.files.book_img_url) {
    var images = request.files.book_img_url;
    name = 'book_{0}_{1}.{2}'.format(new Date().getTime(), request.session.uid, images.type.split('/')[1]);
    address = config.pictureFolderPath + name;
    fs.rename(images.path, address);
  }
  var data = request.body;
  var sql = `insert into book (\`book_author\`,\`publish_time\`, \`publishing\`,\`book_name\`, \`foreign_book_name\`, \`page_num\`, \`book_language\`, \`book_type\`, \`author_profile\`, \`catalogue\`, \`introduction\`, \`abstract\`, \`book_img_url\`) values('${data.book_author}', '${data.publish_time}', '${data.publishing}', '${data.book_name}', '${data.foreign_book_name}', '${data.page_num}', '${data.book_language}', '${data.book_type}', '${data.author_profile}', '${data.catalogue}', '${data.introduction}', '${data.abstract}', '/${name}')`;
  pool.query({
    sql: sql,
    response: response
  });
};
