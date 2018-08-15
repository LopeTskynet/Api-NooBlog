let mongoose = require("mongoose")
let Article = require('../app/models/article.models')

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = require('../index.js')
let should = chai.should()

const jwt = require('jsonwebtoken')

chai.use(chaiHttp)

describe('Article', () => {
  beforeEach((done) => {
    Article.remove({}, (err) => {
      done()
    })
  })

  describe('GET /article', () => {
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

  describe('GET /article/:id', () => {
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

  describe('POST /article', () => {
    it('it should not POST an article without title', (done) => {
      let date = new Date().toLocaleDateString()
      let article = {
        pseudo: 'loperiane',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJub29ibG9nIiwic3ViIjoidGVzdCIsInNjb3BlIjoic2VsZiIsImp0aSI6IjU5MjFkMDA5LWNlYjQtNDhlOC1iMjJhLTk4ZmQ2MjM3MDRmZSIsImlhdCI6MTUzNDM0Mzg0MCwiZXhwIjoxNTM0MzQ3NDQwfQ.ndvYjhtJk5qwPxsiuxH2FaJKnRoX7vmvvTeW5Ny6RsQ',
        article: 'Article test',
        tag: 'OK',
        date: date,
        isFinish: true
      }
      chai.request(server)
      .post('/api/v1/article/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message').eql('no title given')
        done()
      })
    })

    it('it should not POST an article without article', (done) => {
      let date = new Date().toLocaleDateString()
      let article = {
        pseudo: 'loperiane',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJub29ibG9nIiwic3ViIjoidGVzdCIsInNjb3BlIjoic2VsZiIsImp0aSI6IjU5MjFkMDA5LWNlYjQtNDhlOC1iMjJhLTk4ZmQ2MjM3MDRmZSIsImlhdCI6MTUzNDM0Mzg0MCwiZXhwIjoxNTM0MzQ3NDQwfQ.ndvYjhtJk5qwPxsiuxH2FaJKnRoX7vmvvTeW5Ny6RsQ',
        title: 'Article test',
        tag: 'OK',
        date: date,
        isFinish: true
      }
      chai.request(server)
      .post('/api/v1/article/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message').eql('no article given')
        done()
      })
    })

    it('it should not POST an article without tag', (done) => {
      let date = new Date().toLocaleDateString()
      let article = {
        pseudo: 'loperiane',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJub29ibG9nIiwic3ViIjoidGVzdCIsInNjb3BlIjoic2VsZiIsImp0aSI6IjU5MjFkMDA5LWNlYjQtNDhlOC1iMjJhLTk4ZmQ2MjM3MDRmZSIsImlhdCI6MTUzNDM0Mzg0MCwiZXhwIjoxNTM0MzQ3NDQwfQ.ndvYjhtJk5qwPxsiuxH2FaJKnRoX7vmvvTeW5Ny6RsQ',
        article: 'Article test',
        title: 'OK',
        date: date,
        isFinish: true
      }
      chai.request(server)
      .post('/api/v1/article/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message').eql('no tag given')
        done()
      })
    })

    it('it should not POST an article without isFinish', (done) => {
      let date = new Date().toLocaleDateString()
      let article = {
        pseudo: 'loperiane',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJub29ibG9nIiwic3ViIjoidGVzdCIsInNjb3BlIjoic2VsZiIsImp0aSI6IjU5MjFkMDA5LWNlYjQtNDhlOC1iMjJhLTk4ZmQ2MjM3MDRmZSIsImlhdCI6MTUzNDM0Mzg0MCwiZXhwIjoxNTM0MzQ3NDQwfQ.ndvYjhtJk5qwPxsiuxH2FaJKnRoX7vmvvTeW5Ny6RsQ',
        article: 'Article test',
        title: 'ok',
        tag: 'OK',
        date: date
      }
      chai.request(server)
      .post('/api/v1/article/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message').eql('no state given')
        done()
      })
    })

    it('it should not POST an article without pseudo', (done) => {
      let date = new Date().toLocaleDateString()
      let article = {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJub29ibG9nIiwic3ViIjoidGVzdCIsInNjb3BlIjoic2VsZiIsImp0aSI6IjU5MjFkMDA5LWNlYjQtNDhlOC1iMjJhLTk4ZmQ2MjM3MDRmZSIsImlhdCI6MTUzNDM0Mzg0MCwiZXhwIjoxNTM0MzQ3NDQwfQ.ndvYjhtJk5qwPxsiuxH2FaJKnRoX7vmvvTeW5Ny6RsQ',
        article: 'Article test',
        title: 'ok',
        tag: 'OK',
        date: date,
        isFinish: true
      }
      chai.request(server)
      .post('/api/v1/article/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message').eql('no pseudo given')
        done()
      })
    })

    it('it should not POST an article without token', (done) => {
      let date = new Date().toLocaleDateString()
      let article = {
        pseudo: 'loperiane',
        article: 'Article test',
        title: 'ok',
        tag: 'OK',
        date: date,
        isFinish: true
      }
      chai.request(server)
      .post('/api/v1/article/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(400)
        res.body.should.have.property('message').eql('no token given')
        done()
      })
    })

    it('it should POST an article', (done) => {
      let date = new Date().toLocaleDateString()
      let article = {
        pseudo: 'loperiane',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJub29ibG9nIiwic3ViIjoidGVzdCIsInNjb3BlIjoic2VsZiIsImp0aSI6ImYzYWFjYzZlLWRiMjUtNGJkZi1iNTEwLTliMTQyZDI2MzU5NSIsImlhdCI6MTUzNDM2MDQ3MCwiZXhwIjoxNTM0MzY0MDcwfQ.8c9UKTu0dH-zndKRGi0SqbM9pPtw9lQoS1zFHl6FuzA',
        article: 'Article test',
        title: 'ok',
        tag: 'OK',
        date: date,
        isFinish: 'true'
      }
      chai.request(server)
      .post('/api/v1/article/create')
      .send(article)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
    })

  })

})