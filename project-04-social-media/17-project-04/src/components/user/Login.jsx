import React from "react"
import { useForm } from "../../hooks/useForm"
export default function Login(props) {

	const {
		form,
		errors,
		loading,
		response,
		handleChange,
		handleBlur,
		handleSubmit,
		handleSubmitLogin,
	} = useForm()

	return (
		<div>

			<header className="content__header content__header--public">
				<h1 className="content__title">Login</h1>
			</header>

			<div className="content__posts">
				<form className="form-login" action="" onSubmit={(event) => { handleSubmit(event, "login") }}>

					<strong style={response ? { backgroundColor: "#00f" } : null}>{response ? "Logueado correctamente" : null}</strong>

					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" name="email" onChange={handleChange} />
					</div>

					<div className="form-group">
						<label htmlFor="passsword">Password</label>
						<input type="password" name="password" onChange={handleChange} />
					</div>

					<input type="submit" value="identificate" className="btn btn-sueccess"></input>

				</form>

			</div>
		</div>
	)
}