var express = require('express');
var login = require('../controllers/login.js');
var index = require('../controllers/index.js');
var weixin = require('../controllers/weixin.js');
var info = require('../controllers/info.js');
var book = require('../controllers/book.js');
var backstage = require('../controllers/backstage.js');
var authority = require('../controllers/authority.js');
var multiparty = require('connect-multiparty')();
var router = express.Router();


//注册登陆模块
router.get('/login', login.showLogin);
router.get('/login/signOut', login.signOut);
router.post('/login/signIn', login.signIn);
router.post('/login/signUp', login.signUp);
router.get('/login/checkPhone', login.checkPhone);
router.get('/login/checkEmail', login.checkEmail);
router.get('/login/verify', login.verifyMail);
router.post('/login/findVerify', login.findVerify);
router.post('/login/verifyIdentityCode', login.verifyIdentityCode);
router.post('/login/modifyPassword', login.modifyPassword);

//微信模块
router.get('/weixin', weixin.checkSignature);
router.post('/weixin', weixin.weixinEvent);

//登陆验证模块
router.get('*', authority.check);
router.post('*', authority.check);

//以下模块需要登陆验证通过

//首页模块
router.get('/', index.showIndex);
router.post('/index/userMessage', multiparty , index.userMessage);
router.get('/index/userMessage', index.getUserMessage);
router.post('/index/addGood', index.addGood);
router.post('/index/addComment', index.addComment);
router.get('/index/getComment', index.getComment);
router.post('/index/retransmission', index.retransmission);
router.get('/book_center/bookTopList', book.bookTopList);

//详情模块
router.get('/info', info.showInfo);
router.get('/info/showDetails', info.showDetails);
router.post('/info/updateImg', multiparty, info.updateImg);

//书库模块
router.get('/book_center', book.showCenter);
router.get('/book_center/search/:name', book.showCenter);
router.get('/book_details/book/:id', book.book);
router.get('/book_details/:id', book.book_details);
router.get('/book_center/bookNews', book.bookNews);
router.get('/book_center/bookSearch', book.bookSearch);
router.get('/book_center/bookHot', book.bookHot);
router.get('/book_center/bookTypeDetails', book.bookTypeDetails);
router.get('/book_center/search', book.search);
router.post('/book_center/shareBook', book.shareBook);
router.get('/book_center/bookMore', book.bookMore);

//后台模块
router.get('/backstage', backstage.showBackstage);
router.post('/backstage/bookInfo', multiparty , backstage.bookInfo);

module.exports = router;
