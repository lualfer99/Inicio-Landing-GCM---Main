import OptimizedHeader from "@/components/optimized-header"
import OptimizedFooter from "@/components/optimized-footer"

const PoliticaPrivacidadPage = () => {
  return (
    <div>
      <OptimizedHeader />
      <div className="container mx-auto py-8">
        <h1>Política de Privacidad</h1>
        <div
          dangerouslySetInnerHTML={{
            __html: `
          <h1>Política de privacidad</h1>
          <p><b>1.- ¿Quién es el responsable del tratamiento de sus datos?</b></p>
          <p>&nbsp;</p>
          <p><span style="font-weight: 400;">El responsable del tratamiento de sus datos personales es&nbsp; GCM SERVICES LLC. (en adelante, “GCM”), con Nº EIN. </span><span style="font-weight: 400;">99-1045312</span><span style="font-weight: 400;">, y domicilio en </span><span style="font-weight: 400;">4300 RIDGECREST DR SE SUITE L 1277</span><span style="font-weight: 400;">, RIO RANCHO, NM 87124. La presente Política de Privacidad regula el acceso y el uso del Sitio Web (en adelante, el «Sitio Web«) que GCM pone a disposición de los usuarios de Internet (en adelante, los «Usuarios«) interesados en los contenidos (en adelante, los «Contenidos«) y los servicios (en adelante, los «Servicios«) ofertados por GCM en el mismo. Correo electrónico de contacto: info@gcmasesores.io</span></p>
          <p>&nbsp;</p>
          <p><b>2.- Recomendaciones</b></p>
          <p>&nbsp;</p>
          <p><span style="font-weight: 400;">Por favor, lea atentamente y siga las siguientes recomendaciones: Mantenga su equipo equipado con software antivirus debidamente actualizado contra software malicioso y aplicaciones de spyware que puedan poner en peligro su navegación por Internet y la información alojada en su equipo. Lea y revise esta Política de Privacidad y todos los textos legales puestos a disposición por GCM en el Sitio Web.</span></p>
          <p>&nbsp;</p>
          <p><b>3.- Información sobre los datos que GCM recopila a través del Sitio Web</b></p>
          <p>&nbsp;</p>
          <p><span style="font-weight: 400;">Para el correcto funcionamiento del Sitio Web, GCM puede tener acceso a los siguientes datos facilitados, en su caso, por parte de Usuario: Datos de identificación: nombre y apellidos del usuario.</span></p>
          <p>&nbsp;</p>
          <p><b>4.- ¿Por qué GCM está legitimada para procesar sus datos?</b></p>
          <p>&nbsp;</p>
          <p><span style="font-weight: 400;">La base de legitimación de GCM para el tratamiento de los datos de los Usuarios a través de este Sitio Web es el consentimiento de los Usuarios al tratamiento de sus datos personales. En este sentido, GCM trata los datos personales de los Usuarios con la finalidad de permitir la relación comercial solicitada por el usuario, así como también para la remisión de comunicaciones comerciales y/o Newsletters sobre sus propios productos y/o servicios. Aceptando la presente Política de Privacidad y marcando las casillas correspondientes, el Usuario presta su consentimiento a dicho tratamiento. GCM se toma muy en serio la protección de su privacidad y sus datos personales. Por esta razón, sus datos personales se conservan de forma segura y se tratan con el máximo cuidado, de conformidad con las disposiciones del Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (el «Reglamento general de protección de datos» o «Reglamento de protección de datos o RGPD«). La presente Política de Privacidad regula el acceso y el uso del servicio que GCM pone a disposición del Usuario interesado en los servicios y contenidos alojados en el Sitio Web. Por lo que respecta a este punto, el Usuario podrá retirar su consentimiento en cualquier momento mandando un mensaje a la siguiente dirección de correo electrónico: info@gcmasesores.io sin que ello afecte a la licitud del tratamiento basado en el consentimiento previo a su retirada.</span></p>
        `,
          }}
        />
      </div>
      <OptimizedFooter />
    </div>
  )
}

export default PoliticaPrivacidadPage
