import React from "react"
import "../../assets/css/styles.css"
import { useForm } from "../../hooks/useForm"
export default function Register(props) {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm()
  return (
    <div>
      <header className="content__header content__header--public">
        <h1 className="content__title">Register</h1>
      </header>

      <div className="content__posts">

        <strong style={response ? { backgroundColor: "#00f" } : null}>{response ? "Registrado correctamente" : null}</strong>

        <form className="register-form" onSubmit={(event) => { handleSubmit(event, "register") }}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="surname">Apellido</label>
            <input type="text" name="surname" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo Electronico</label>
            <input type="email" name="email" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={handleChange} />
          </div>

          <input type="submit" value="Registrate" className="btn btn-success" />

        </form>
      </div>
    </div >
  )
}
