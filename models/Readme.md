Database
========

This directory content database connect and models.

## Schema ##

### users ###
- paranoid

 Name       | Type       | Attribute       | Comment
 -----------|:----------:| --------------- | -------------------------
 id         | int        | ai, nn, primary |
 username   | vchar(24)  | uniq, nn        | Username
 password   | vchar(100) | nn              | User's password hash
 nickname   | vchar(16)  | uniq, nn        | User's nickname
 email      | vchar(48)  | uniq            | User's email
 created_at | datetime   | nn              | Record created time
 updated_at | datetime   | nn              | Record last updated time

