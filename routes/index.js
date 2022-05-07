var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/product', (req, res) => {
  res.json({
    status: 200,
    message: 'Success',
    data : {
      username: 'Dika Brenda Angkasa',
      job: 'Test Engineer'
    }
  })
})

module.exports = router;
