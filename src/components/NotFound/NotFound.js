function NotFound() {
  return (
    <div className="notFound">
      <image className="notFound__icon" />
      <h3 className="notFound__title">
        Nothing found
      </h3>
      <p className="notFound__text">
        Sorry, but nothing matched <br/>
        your search terms.
      </p>
    </div>
  )
}
export default NotFound;