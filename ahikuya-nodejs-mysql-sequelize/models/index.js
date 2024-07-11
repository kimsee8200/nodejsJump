'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
// 노드 실행 환경. 설정된 값이 없으면 'development'를 사용한다.
const env = process.env.NODE_ENV || 'development';
// 실행 환경에 맞는 DB 접속 정보를 가져온다.
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

/* sequelize 객체 생성 */
let sequelize;
if (config.use_env_variable) {
  // .env 같은 모듈을 사용해서 환경 변수에 데이터베이스 접속 정보를 등록해서 사용한다면, 
  // use_env_variable에 정의된 값을 키로 환경 변수에서 데이터베이스 접속 정보를 가져와서 Sequelize 객체를 생성한다.
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // config에 있는 database, username, password 등을 사용해서 Sequelize 객체를 생성한다.
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// models 폴더에 생성한 데이터베이스 테이블 매핑을 위한 각각의 js 파일을 가져와서 
// Sequelize 모델로 변환하고 db 객체에 담는다.
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      // models 폴더에서 index 파일을 제외하고 js 파일을 가져온다.
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // 모델이 정의된 .js 파일을 통해서 Sequelize 모델을 생성한다.
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // db 객체에 모델 정보를 저장한다.
    db[model.name] = model;
  });

// 각 모델 파일에서 associate() 함수가 구현되어 있다면,
// associate() 함수로 전체 모델 정보를 전달해서 associate() 함수에 구현된 모델 간의 관계를 설정한다.
// 연관 관계란, RDBMS에서 테이블 간의 외래키를 설정하는 것과 같은 테이블의 연관 관계를 Sequelize 모델에서 하는 것이다.
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
