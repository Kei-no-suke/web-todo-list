# web-todo-list
フロントエンドをAngularでバックエンドをSpring Bootで作成したTodoリストアプリ

## 想定環境
Windows 11  
Node ver. 18.18.2  
npm ver. 9.8.1  
Angular CLI ver. 16.2.6  
Eclipse Pleiades All in One Java Full Edition 2023-09  
Spring Boot ver. 3.1.5  
dependency management ver. 1.1.3  
jdk 17  
PostgreSQL ver. 15.4  

## フロントエンド側
### 実行手順

以下のコマンドを実行する。

```powershell
cd frontend/todo-list
npm install
ng serve
```

## バックエンド側
### 実行手順

1. Eclipseでファイル>インポート>一般>フォルダーまたはアーカイブからプロジェクトでbackendフォルダ内のtodoListフォルダをインポートする。
2. application.propertiesの設定を行う。  
dbnameにデータベース名を、usernameにユーザー名を、passwordにパスワードを設定する。
```
spring.jpa.database=POSTGRESQL
spring.datasource.url=jdbc:postgresql://localhost:5432/dbname
spring.datasource.username=username
spring.datasource.password=password
```
3. todoListのプロジェクトを選択した状態でSpring Bootアプリケーションとして実行する。


