import './styles.css'

export default function InputField() {
  return (
    <form className="input">
        <input type="text" className="input__box" placeholder="Enter a text"/>
        <button className="input__submit" type="submit">Go</button>
    </form>
  )
}
