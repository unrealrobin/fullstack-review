import React from 'react';

const Repo = (props) => (
  <div>
    <h3>{`${props.count} | ${props.repoInfo.username}`}</h3>
    <p>Check it out: <a href={props.repoInfo.url}>{`${props.repoInfo.url}`}</a></p>
  </div>
)

export default Repo;