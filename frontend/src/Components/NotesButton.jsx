const NotesButton = ({title, color, clickHandler}) =>{
    const ButtonClass = `${color} hover:shadow hover:shadow-black w-fit mx-auto text-white rounded-full py-1 px-3 my-2`
    return <button onClick={clickHandler} type='button' className={ButtonClass}>{title}</button>
}
export default NotesButton