/**
 * @Author: John Isaacs <john>
 * @Date:   07-Feb-192019
 * @Filename: repotest.js
 * @Last modified by:   john
 * @Last modified time: 07-Feb-192019
 * uses OctoKit https://octokit.github.io/rest.js/
 */
const Octokit = require('@octokit/rest')
const octokit = new Octokit({
  auth: 'token f959a0a41c7771110edee43197854dbe8efebef1',
  userAgent: 'octokit/rest.js v1.2.3'
})

var reposList = [];

getAllReposForOrg('CM2104-DynamicWebDevelopment', 'all');

function getAllReposForOrg(org, type) {
  getPage(org, type, 1);
}

function getPage(org, type, page) {
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
      getPage(org, type, page)
    } else {
      gotPages(org)
    }
  })
}

function processRepos(repos) {
  repos.forEach(function(element) {
    reposList.push(element);
  });
}

function listRepoNames(){
  reposList.forEach(function(element) {
    console.log(element.name)
  });
}

function listRepoData(){
  reposList.forEach(function(element) {
    console.log(element.name+" : "+element.updated_at+" : "+element.html_url)
  });
}

function gotPages(org) {
  console.log("got "+reposList.length+" repos from " + org);
listRepoData();

}

function prettyJSON(obj) {
  console.log(JSON.stringify(obj, null, 2));
}
