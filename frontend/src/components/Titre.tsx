
interface TitreProps{
    titre : string
}
const Titre = ({titre} : TitreProps ) => {
  return (
    <div>
        <h1 className="text-2xl font-bold font-serif">
            {titre}
            
        </h1>
      
    </div>
  )
}

export default Titre
