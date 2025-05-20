
from .models import Projet

# Fonction utilitaire pour formater mes projets
# def build_projects_snippet() -> str:
#     """Retourne une liste markdown des projets pour le prompt GPT"""
#     lignes = []
#     for p in Projet.objects.all().order_by("-id")[:10]:   # les 10 + récents
#         techs = ", ".join(p.technologies)
#         lignes.append(f"- **{p.titre}** : {p.description} _(stack : {techs})_ – [Demo]({p.demolien})")
#     return "\n".join(lignes)


from .models import Projet, Blog

def build_portfolio_context():
    # Projets
    projets = Projet.objects.all().order_by("-id")[:5]
    projets_str = "\n".join(
        f"- **{p.titre}** : {p.description}" for p in projets
    )

    # Articles
    articles = Blog.objects.all().order_by("-date_pub")[:3]
    articles_str = "\n".join(
        f"- [{a.titre}] publié le {a.date}" for a in articles
    )

    return f"""
### Projets récents :
{projets_str}

### Articles récents :
{articles_str}
"""
