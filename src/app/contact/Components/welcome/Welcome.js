import css from './Welcome.module.scss';
import moi from '../../ressources/image/moi.png'

function Welcome() {


    return (
        <section>
            <div className={css.bg}/>

            <div className={css.content}>

                <img src={moi} alt="dessin du portrait de Bréval Le Floch" className={css.avatar} height="380"
                     width="380"/>

                <div className={css.text}>
                    <h1 className={css.title}>Bréval Le Floch</h1>
                    <h2 className={css.title}>Développeur full stack</h2>
                    <p className={css.desc}>
                        Passionné par les nouvelles technologies et par la physique, je suis quelqu'un de curieux et
                        réfléchi.
                        <br/>
                        J'aime trouver de nouvelles méthodes pour résoudre un problème.
                    </p>


                    {/*<div className={css.colorBox}>*/}
                    {/*    <div className={css.vibrant}>Vibrant</div>*/}
                    {/*    <div className={css.vibrantDark}>Dark Vibrant</div>*/}
                    {/*    <div className={css.vibrantLight}>Light Vibrant</div>*/}
                    {/*    <div className={css.sec}>Muted</div>*/}
                    {/*    <div className={css.secLight}>Light Muted</div>*/}
                    {/*    <div className={css.secDark}>Dark Muted</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </section>

    );
}

export default Welcome;