'use strict'

const db = require('../util/database');

module.exports = class Users {
  constructor(fname, lname, email, password) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
  }
  save() {
    return db.execute('INSERT INTO users (fname, lname, email, password) VALUES (?,?,?,?)',
      [this.fname, this.lname, this.email, this.password]);
  };
  // ----------------------------------------- fetching -----------------------------------
  static fetchAll(limit, offset) {
    return db.execute(`SELECT * FROM user LIMIT ${limit} OFFSET ${offset}`);
  }

  // ----------------------------updating---------------------------

  static updateById(fname, lname, email, password, id) {
    return db.execute('UPDATE user SET fname = (?), lname = (?), email = (?), password = (?)  WHERE id = (?)',
      [fname, lname, email, password, id]);
  }

  // ----------------------------finding -------------------------------------
  static findOneByEmail(email) {
    return db.execute('SELECT * FROM user WHERE email = (?)', [email]);
  }


  static findById(id) {
    return db.execute('SELECT * FROM user WHERE id = (?)', [id]);
  }

  // -----------------------------deleting--------------------------------
  static deleteById(id) {
    return db.execute('DELETE FROM user WHERE id = (?)', [id]);
  }
}