import { useEffect } from "react"
import { useState } from "react"

export function TrenCrud(){
  const [trenes, setTrenes] = useState([])

  useEffect(() => {
    setTrenes([
      {id: 1, nombre: 'Expreso', modelo: 'X200', capacidad: 300},
      {id: 2, nombre: 'Rápido', modelo: 'R100', capacidad: 200},
      {id: 3, nombre: 'Local', modelo: 'L50', capacidad: 100},
      {id: 1, nombre: 'Expreso', modelo: 'X200', capacidad: 300},
      {id: 2, nombre: 'Rápido', modelo: 'R100', capacidad: 200},
      {id: 3, nombre: 'Local', modelo: 'L50', capacidad: 100},
      {id: 1, nombre: 'Expreso', modelo: 'X200', capacidad: 300},
      {id: 2, nombre: 'Rápido', modelo: 'R100', capacidad: 200},
      {id: 3, nombre: 'Local', modelo: 'L50', capacidad: 100},
      {id: 1, nombre: 'Expreso', modelo: 'X200', capacidad: 300},
      {id: 2, nombre: 'Rápido', modelo: 'R100', capacidad: 200},
      {id: 3, nombre: 'Local', modelo: 'L50', capacidad: 100},
      
    ])
  }, [])

  return(
    <div>
      <h1 className="h1 mt-2 text-center">Lista de Trenes</h1>  
    
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-info">Crear un tren</button>

        <div className="input-group w-auto">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar por id" 
          />
          <span className="input-group-text">
            🔍
          </span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead className="border-info fw-bold">
            <tr >
              <td style={{borderRightWidth:1}}>ID</td>
              <td >Nombre</td>
              <td>Modelo</td>
              <td>Capacidad</td>
              <td className="text-end" style={{paddingRight: 75}}>Accion</td>
            </tr>
          </thead>

          <tbody>
            {trenes.map((tren) => {
              return( 
               <tr key={tren.id}>
                  <td className="border-dark" style={{borderRightWidth:1}}>{tren.id}</td>
                  <td>{tren.nombre}</td>
                  <td>{tren.modelo}</td>
                  <td>{tren.capacidad}</td>

                  <td className="text-end">
                    <button className="btn btn-sm bg-info text-white me-2">
                      Editar
                    </button>
                    <button className="btn btn-sm bg-danger text-white">
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </div>
    
  )
}