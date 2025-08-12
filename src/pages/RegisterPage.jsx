import RailTrackerLogo from '../assets/RailTrackerImages/RailTrackerLogoRecorted.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
//import { registerUser } from "../services/api";

export function RegisterPage() {
  const { register, formState: { errors } , handleSubmit} = useForm({mode: "onBlur"})
  
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.apellido || !form.correo || !form.password) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      throw new Error();
      // const response = await registerUser(form);
      // if (response.success) {
      //   alert("Cuenta creada con éxito");
      //   navigate("/login");
      // } else {
      //   alert("Error al crear cuenta");
      // }
    } catch (error) {
      alert("Hubo un problema con el registro");
      console.error(error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: "400px", width: "100%" }}> 
        <div className="mb-4 text-center d-flex align-items-center justify-content-center gap-2" style={{textTransform: "none"}}>
          <img
            src={RailTrackerLogo}
            alt="Ferrocarril Icono"
            onClick={() => navigate("/")}
            style={{ width: "60px", height: "60px", marginRight: "8px", cursor: 'pointer' }}
          />
          <span style={{fontSize: "2rem", fontWeight: "bold"}}>Registrarse</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-1">
            <label className="form-label" htmlFor="nombre">Nombre:</label>
            <input id="nombre" type="text" {...register('nombre', {required: 'El nombre es requerido', pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: "Solo se permiten letras y espacios"
              }})}           
              className="form-control" placeholder="Nombre"/>
            {errors.nombre && <span className="text-danger">{errors.nombre.message}</span>}
          </div>

          <div className="mb-1">
            <label className="form-label" htmlFor="apellido">Apellido:</label>
            <input id="apellido" type="text" {...register('apellido', {required: 'El apellido es requerido',
              pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                message: "Solo se permiten letras y espacios"
              }
            })} 
              className="form-control" placeholder="Apellido"/>
            {errors.apellido && <span className='text-danger'>{errors.apellido.message}</span>}
          </div>

          <div className="mb-1">
            <label htmlFor="correo" className="form-label">Correo electrónico:</label>
            <input id="correo" {...register('email', {required: "El email es requerido", pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Correo electrónico inválido"}})
              } className="form-control" placeholder="Correo electrónico"/>
          </div>
          {errors.email && <span className='text-danger'>{errors.email.message}</span>}
        
          <div className="mb-2">
            <label htmlFor="password" className="form-label">Contraseña:</label>
            <input type="password" id="password" {...register('password', {required: "La contraseña es requerida", pattern: {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  message: "La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y un símbolo"
} })} className="form-control" placeholder="Contraseña"/>
            {errors.password && <span className='text-danger'>{errors.password.message}</span>}
          </div>

          <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/login")}
          >
            Volver
          </button>
          <button type="submit" className="btn btn-success">
            Crear cuenta
          </button>
        </div>
        
        </form>

        <div className="mt-4 border-top pt-3 text-center">
          <p>Registrarse con</p>
          <div className="d-flex justify-content-center gap-3">
            <img
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="Google"
              onClick={() => navigate("/pagina-en-construccion")}
              style={{ width: "35px", cursor: "pointer" }}
            />
            <img
              src="https://img.icons8.com/color/48/facebook-new.png"
              alt="Facebook"
              onClick={() => navigate("/pagina-en-construccion")}
              style={{ width: "35px", cursor: "pointer" }}
              className="mx-2"
            />
            <img
              src="https://img.icons8.com/ios-filled/50/mac-os.png"
              alt="Apple"
              onClick={() => navigate("/pagina-en-construccion")}
              style={{ width: "35px", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
