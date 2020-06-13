import React from 'react';

const Repo = (props) => (
  <div>
    <h3>{props.repoInfo.username}</h3>
    <p>{`Private: ${props.repoInfo.private}`}</p>
    <p>Check it out: <a href={props.repoInfo.url}>{`${props.repoInfo.url}`}</a></p>
  </div>
)

export default Repo;