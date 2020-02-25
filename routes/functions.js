/**
 * @Author: John Isaacs <john>
 * @Date:   07-Feb-192019
 * @Filename: functions.js
 * @Last modified by:   john
 * @Last modified time: 08-Feb-192019
 */
var express = require('express');
var router = express.Router();




//array to hold retrieved repos
var reposList = [];

//Octokit setup code.
const {
  DateTime
} = require("luxon");
const Octokit = require('@octokit/rest')
const octokit = new Octokit({
  auth: 'token f959a0a41c7771110edee43197854dbe8efebef1',
  userAgent: 'octokit/rest.js v1.2.3'
})

router.get('/', function(req, res, next) {
  res.send('respond with a functional resource');
});

/* GET repolist listing. */
router.get('/repolist', function(req, res, next) {
  var org = req.query.org;
  var type = req.query.type;
  if (!org) {
    var json = {
      error: "no org"
    }
    res.json(json);
  } else {
    if (!type) {
      type = 'all'
    };
    getAllReposForOrg(org, type, function() {
      var json = {
        data: reposList
      }
      res.json(json);
    });
  }
});


//***********************functions!******************************



function getAllReposForOrg(org, type, callback) {
  //console.log(callback);
  reposList = [];
  getPage(org, type, 1, callback);
}

function getPage(org, type, page, callback) {
  // Compare: https://developer.github.com/v3/repos/#list-organization-repositories
  octokit.repos.listForOrg({
    org: org,
    type: type,
    per_page: "100",
    page: page

  }).then(({
    data,
    status,
    headers
  }) => {
    //console.log(page);
    processRepos(data);
    page++;
    if (data.length > 0) {
      getPage(org, type, page, callback)
    } else {
      gotPages(org, callback)
    }
  })
}

function processRepos(repos) {
  //reposList.concat(repos);

  repos.forEach(function(element) {
    var start = DateTime.fromISO(element.updated_at);
    var now = DateTime.local();
    var diffInDays = now.diff(start, 'days');
    getLastCommit(element.name, element.owner.login).then(data => {
      //prettyJSON(data);
      reposList.push({
        id: element.id,
        name: element.name,
        lastactivity: start.toLocaleString(DateTime.DATETIME_SHORT),
        age: Math.round(diffInDays.toObject().days),
        link: element.html_url,
        file: data.data.files[0].filename
      });
    })
  });
}

function getLastCommit(repo, owner) {
  return new Promise((resolve, reject) => {

    octokit.repos.getCommit({
      owner: owner,
      repo: repo,
      commit_sha: 'master'
    }).then(
      result => {
        if (result) {
          resolve(result);
        } else {
          reject(Error("It broke"));
        }
      });

  });


}

function listRepoNames() {
  reposList.forEach(function(element) {
    console.log(element.name)
  });
}

function listRepoData() {
  reposList.forEach(function(element) {
    console.log(element.name + " : " + element.updated_at + " : " + element.html_url)
  });
}

function gotPages(org, callback) {
  console.log("got " + reposList.length + " repos from " + org);


  callback();
  //listRepoData();

}



function prettyJSON(obj) {
  console.log(JSON.stringify(obj, null, 2));
}

module.exports = router;
