
interface TitreProps{
    titre : string
}
const Titre = ({titre} : TitreProps ) => {
  return (
    <div>
        <h1>
            {titre}
            
        </h1>
      
    </div>
  )
}

export default Titre
