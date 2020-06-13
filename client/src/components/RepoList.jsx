import React from 'react';
import Repo from './Repos.js';

const RepoList = (props) => (
  <div>
    {
      props.repos.map((repo, index) => {
        return <Repo repoInfo={repo} key={index} count={index} />
      })
    }
  </div>
)

export default RepoList;