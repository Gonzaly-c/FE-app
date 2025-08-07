import RailTrackerLogo from '../assets/RailTrackerImages/RailTrackerLogoRecorted.png';
import { useForm } from 'react-hook-form';

export function LoginPage(){
  
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }} = useForm();

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve,4000))
  }
  
  const buttonClass = 'btn w-100 my-2 ' + (isSubmitting? 'btn-info': 'btn-success')

  return(
    <div className="bg-light d-flex justify-content-center align-items-center vh-100">

      <div className="card shadow-sm py-3 px-2" style={{width: '400px'}}>
        <div className="card-body">
          <p className="h1 card-title text-center mb-4 text-dark-emphasis">
            <img src={RailTrackerLogo} className='mr-3' style={{width:'60px', height: '60px', cursor: 'pointer'}}/>
            RailTracker 
          </p>    

          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="">
              <label htmlFor="correo" className="form-label">Correo electrónico</label>
              <input id="correo" {...register('email', {required: "El email es requerido", pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address"}})
          } className="form-control" placeholder="Correo electrónico"/>
            </div>
            {errors.email && <span className='text-danger'>{errors.email.message}</span>}

            <div className="my-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" id="password" {...register('password', {required: "La contraseña es requerida", })} className="form-control" placeholder="Contraseña"/>
              {errors.password && <span className='text-danger'>{errors.password.message}</span>}
            </div>
            
            <button type="submit" className={buttonClass} w-100 mt-1 disabled={!isValid}>{isSubmitting? 'Enviando..': 'INICIAR SESIÓN'}</button>
            
          </form>

          <div className="text-center mt-3">
            ¿Quieres ser conductor? <a href="registro.html" className="fw-bold link-underline text-info">Contáctanos</a>
          </div>

          <div className="text-center mt-4 pt-3 border-top">
            <p className="mb-2">Continuar con</p>
            <div className="d-flex justify-content-center gap-3">
              <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google"
                style={{width:'35px', height: '35px', cursor: 'pointer'}}/>
              <img src="https://img.icons8.com/color/48/facebook-new.png" alt="Facebook"
                style={{width:'35px', height: '35px', cursor: 'pointer'}} className = 'mx-2'/>
              <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple"
                style={{width:'35px', height: '35px', cursor: 'pointer'}}/>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}
