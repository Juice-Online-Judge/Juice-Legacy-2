Database
========

This directory content database connect and models.

## Schema ##

### users ###
- paranoid

 Name     | Type       | Attribute       | Comment
 ---------|:----------:| --------------- | --------------------
 id       | int        | ai, nn, primary |
 username | vchar(32)  | uniq, nn        | Username
 email    | vchar(64)  | uniq, nn        | User's email
 password | vchar(128) | nn              | User's password hash

