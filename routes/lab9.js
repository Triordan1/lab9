const express = require('express');
const router = express.Router();
const mysql = require('mysql');

/* query sql
 SELECT q.quoteId, q.quote, q.category, q.likes, CONCAT(a.firstname, ' ', a.lastName) AS 'Author', a.sex AS 'Gender' FROM l9_quotes q 
 INNER JOIN l9_author a ON q.authorId = a.authorId
 WHERE q.quote LIKE '%%' AND IF('Wisdom' != '', q.category = 'Wisdom', TRUE) AND 
 CONCAT(a.firstname, ' ', a.lastName) LIKE 'A%' AND IF('M' != '', a.sex = 'M', TRUE)
 */

router.get('/quotes', function(req, res, next) {

    // Get a query string value for filter
    const keywordFilter = req.query.keyword;
    const categoryFilter = req.query.category;
    const nameFilter = req.query.name;
    const genderFilter = req.query.gender;
    
    console.log(req.query);
    
    const connection = mysql.createConnection({
        host: 'd5x4ae6ze2og6sjo.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'e81pzkx7m2mohx3j',
        password: 'xpm2f6ah28mwi9to',
        database: 'hqraena82cb6nc44'
    });

    connection.connect();

    connection.query(`SELECT q.quoteId, q.quote, q.category, q.likes, IF(q.authorId IS NULL, 'Anonymous', CONCAT(a.firstname, ' ', a.lastName)) AS 'author', IF(a.sex IS NULL, 'NONE', a.sex) AS 'gender',
    a.portrait, a.dob, a.dod, a.profession, a.country, a.biography
    FROM l9_quotes q 
    LEFT JOIN l9_author a ON q.authorId = a.authorId
    WHERE q.quote LIKE '%${keywordFilter}%' AND IF('${categoryFilter}' != '', q.category = '${categoryFilter}', TRUE) AND 
    IF('${nameFilter}' != '', CONCAT(a.firstname, ' ', a.lastName) LIKE '%${nameFilter}%', TRUE) 
    AND IF('${genderFilter}' != '', a.sex = '${genderFilter}', TRUE)`,

        function(error, results, fields) {
            if (error) throw error;
            
            res.json(results);

        });

    connection.end();

});

router.get('/', function(req, res) {
    res.render('lab9/index', { layout: false });
});


router.get('/author', function(req, res) {
    /* getting author sql
    SELECT  firstName, lastName, dob, dod, sex, profession, country, portrait, biography 
    FROM l9_author WHERE CONCAT(firstName, ' ', lastName) = 'Albert Einstein'
    */
});

router.get('/categories', function(req, res) {

    const connection = mysql.createConnection({
        host: 'mcldisu5ppkm29wf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'hjj9j8k3hg4vez58',
        password: 'wq66tam2usicvai5 ',
        database: 'a5d1v7oost97gtf1'
    });

    connection.connect();

    connection.query(`SELECT DISTINCT category FROM l9_quotes`,

        function(error, results, fields) {
            if (error) throw error;
            console.log(results);

            res.json(results);
        });

    connection.end();

});

router.get('/genders', function(req, res) {

    const connection = mysql.createConnection({
        host: 'mcldisu5ppkm29wf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'hjj9j8k3hg4vez58',
        password: 'xpm2f6ah28mwi9to',
        database: 'a5d1v7oost97gtf1'
    });

    connection.connect();

    connection.query(`SELECT DISTINCT * FROM l9_gender`,

        function(error, results, fields) {
            if (error) throw error;
            console.log(results);

            res.json(results);
        });

    connection.end();

});
module.exports = router;