import RailTrackerLogo from '../assets/RailTrackerImages/RailTrackerLogoRecorted.png';

export function LoginPage(){
  return(
    <div className="bg-light d-flex justify-content-center align-items-center vh-100">

      <div className="card shadow-sm py-3 px-2" style={{width: '400px'}}>
        <div className="card-body">
          <p className="h1 card-title text-center mb-4 text-dark-emphasis">
            <img src={RailTrackerLogo} className='mr-3' style={{width:'60px', height: '60px', cursor: 'pointer'}}/>
            RailTracker 
          </p>    

          <form>
            <div className="mb-3">
              <label htmlFor="correo" className="form-label">Correo electrónico</label>
              <input type="email" id="correo" name="correo" className="form-control" placeholder="Correo electrónico" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input type="password" id="password" name="password" className="form-control" placeholder="Contraseña" required/>
            </div>
            <button type="submit" className="btn btn-success w-100 mt-1">Iniciar Sesión</button>
          </form>

          <div className="text-center mt-3">
            ¿No tienes cuenta? <a href="registro.html" className="fw-bold link-underline text-info">Regístrate</a>
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
