let mongoose = require("mongoose")
let Article = require('../app/models/article.models')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index.js')
let should = chai.should()

chai.use(chaiHttp)

describe('Article', () => {
  beforeEach((done) => {
    Article.remove({}, (err) => {
      done()
    })
  })

  describe('/GET article', () => {
    it('it should GET all the articles', (done) => {
      chai.request(server)
        .get('/api/v1/article/all')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          
        done()
        })
    })
  })

  describe('/GET/:id article', () => {
    it('it should GET a specific article', (done) => {
      let date = new Date().toLocaleDateString()
      let article = new Article({article: "Je suis un article", title: "Attention au poule", tag: "Dylan Bourdere", date: date, isFinish: true })
      article.save((err, article) => {
        chai.request(server)
          .get('/api/v1/article/' + article.id)
          .send(article)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('article')
            res.body.should.have.property('title')
            res.body.should.have.property('tag')
            res.body.should.have.property('date')
            res.body.should.have.property('isFinish')
            res.body.should.have.property('_id').eql(article.id)
          
          done()

          })
      })
    })
  })

})