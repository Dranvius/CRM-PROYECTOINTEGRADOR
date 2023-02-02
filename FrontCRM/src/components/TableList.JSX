export function TableList() {
  const usuarios = [
    {
      nombre: "sergio",
      apellido: "linares",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 1023974646,
    },
    {
      nombre: "alexis",
      apellido: "ducuara",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 123456789,
    },
    {
      nombre: "Nappy",
      apellido: "blanco",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 987456123,
    },
    {
      nombre: "Nappy",
      apellido: "blanco",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 987456123,
    },
    {
      nombre: "Nappy",
      apellido: "blanco",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 987456123,
    },
    {
      nombre: "Nappy",
      apellido: "blanco",
      correo: "Dranvius12@hotmail.com",
      telefono: 123456789,
      cc: 987456123,
    },
  ];

  const cambioName = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Cambio Nombre",
      titleText: "Nombre Actual :\n",
      iconColor: "blue",
      icon: "question",
      color: "black",
      width: "35%",
      confirmButtonColor: "green",
      confirmButtonAriaLabel: "Confirmar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "red",
      background: "white",
      footer:
        "<center><b>RECUERDA</b><br>EL NOMBRE PUEDE AFECTAR EN EL LOGIN</center>",
      html:
        '<input id="swal-input1" className="swal2-input" placeholder="Nuevo Nombre">' +
        '<input id="swal-input2" className="swal2-input" placeholder="Nuevo Apellido">',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("swal-input1").value,
          document.getElementById("swal-input2").value,
        ];
      },
    });

    if (formValues) {
      try {
        formValues.push(profile.email);
        console.log(formValues);
        const peticion = await axios.post("/cambiarNombre", formValues);

        Swal.fire({
          icon: "success",
          title: "Finalizado con exito",
          confirmButtonColor: "green",
        });

        navigate("/profile");

        console.log(peticion);
      } catch (error) {
        console.log(error);

        Swal.fire({
          title: "ALGO SALIO MAL",
          confirmButtonColor: "red",
          footer: "<center>INFORMAR AL AREA DE SISTEMAS</center>",
          color: "black",
          width: "20%",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <table className="table table-dark  table-hover">
        <thead>
          <tr>
            <td scope="col">#</td>
            <td scope="col">Nombre</td>
            <td scope="col">Apellido</td>
            <td scope="col">Cédula</td>
            <td scope="col">Correo</td>
            <td scope="col">Telefono</td>
            <td scope="col">Botones de acción</td>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((objeto, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{objeto.nombre}</td>
              <td>{objeto.apellido}</td>
              <td>{objeto.cc}</td>
              <td>{objeto.correo}</td>
              <td>{objeto.telefono}</td>
              <td>
                <div class="btn-group">
                  <a href="#" class="btn btn-primary">
                    Editar
                  </a>
                  <a href="#" class="btn btn-danger">
                    Eliminar
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
