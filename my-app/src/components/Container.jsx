// Layout generico: racchiude i children in un div.container. (Es. 1)
function Container({ children }) {
  return <div className="container">{children}</div>
}

export default Container
