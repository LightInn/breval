import css from './Me.module.scss';
import moi from "../../ressources/image/breval_halo.jpg";
import moiW from "../../ressources/image/breval_halo.webp";
import React, { Component } from 'react';
// import PDF from './../../ressources/CV.pdf';






function Me() {





    return (

        <section>


            <div className={css.content}>


                <div className={css.text}>
                    <h2 className={css.title}>A propos de moi...</h2>
                    <p className={css.desc}>
                        Je m’appelle Bréval Le Floch, j’ai 20 ans. Je suis sur la voie pour devenir développeur
                        Freelance, et je suis étudiant à l’EPSI Nantes en deuxième année.
                        <br/>
                        Je suis passionné par l&apos;informatique depuis les études préparatoires et j&apos;aime envisager le
                        monde qui m&apos;entoure
                        sous différents angles. L&apos;informatique me permet d&apos;explorer tout un nouveau monde régis par ses
                        propres règles logiques.
                        Un monde qui permet à n’importe qui d’imaginer et construire n’importe quoi à l’aide d’un simple clavier.
                        <br/>
                        J&apos;aime faire des projets professionnels afin d’approfondir mes connaissances et de tester
                        toujours plus de technologies.
                    </p>

                </div>

                <div className={css.rightPanel}>




                    <picture>

                        {/*<img src={moi} alt="dessin du portrait de Bréval Le Floch" className={css.avatar}/>*/}
                        <img src={moiW} alt="dessin du portrait de Bréval Le Floch" className={css.avatar}/>


                    </picture>



                    <button className={css.button} onClick={()=>{window.open(PDF);}}>
                        Télécharger mon CV
                    </button>


                </div>
            </div>


        </section>


    );
}

export default Me;
