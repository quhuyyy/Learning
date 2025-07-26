import InputItem from "../InputItem/InputItem";

function Lab({ index = 1 }) {

  const items = []

  for (var i = 1; i <= index; i++) {
    if (i > 1) {
      items.push(<InputItem key={`Inlab${i - 1}`} lab={`Inlab`} index={i - 1} />)
    }
    items.push(<InputItem key={`Prelab${i}`} lab={`Prelab`} index={i} />)
  }

  return (
    <>
      {items}
    </>
  )
}
export default Lab