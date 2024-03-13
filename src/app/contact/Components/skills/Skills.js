import css from './Skills.module.scss';

function Skills() {
    return (
        <section>
            <div className={css.content}>
                <div className={css.text}>
                    <h2 className={css.title}>Compétences</h2>

                    <div className={css.skillsContent}>

                        <div className={css.leftPart}>
                            <div className={css.skillPart}>
                                <h3 className={css.subtitle}>Compétences développement</h3>
                                <div className={css.skillSets}>
                                    <div className={css.skill}>PHP</div>
                                    <div className={css.skill}>JS</div>
                                    <div className={css.skill}>Dart</div>
                                    <div className={css.skill}>Kotlin</div>
                                    <div className={css.skill}>Java</div>
                                    <div className={css.skill}>C</div>
                                    <div className={css.skill}>HTML</div>
                                    <div className={css.skill}>C++</div>
                                    <div className={css.skill}>VueJS</div>
                                    <div className={css.skill}>Ionic</div>
                                    <div className={css.skill}>C#</div>
                                    <div className={css.skill}>CSS</div>
                                    <div className={css.skill}>Angular</div>
                                    <div className={css.skill}>Flask</div>
                                    <div className={css.skill}>Python</div>
                                    <div className={css.skill}>Flutter</div>
                                </div>
                            </div>


                            <div className={css.skillPart}>
                                <h3 className={css.subtitle}>Compétences systèmes et réseaux </h3>
                                <div className={css.skillSets}>
                                    <div className={css.skill}>Ansible</div>
                                    <div className={css.skill}>MariaDB</div>
                                    <div className={css.skill}>Postgresql</div>
                                    <div className={css.skill}>Apache</div>
                                    <div className={css.skill}>Git</div>
                                    <div className={css.skill}>SSH</div>
                                    <div className={css.skill}>OpenVPN</div>
                                    <div className={css.skill}>Bash</div>
                                </div>
                            </div>


                            <div className={css.skillPart}>
                                <h3 className={css.subtitle}>Autres compétences</h3>
                                <div className={css.skillSets}>
                                    <div className={css.skill}>Blender</div>
                                </div>
                            </div>


                        </div>
                        <div className={css.rightPart}>
                            <div className={css.skillPart}>
                                <h3 className={css.subtitle}>Valeurs</h3>
                                <div className={css.skillValues}>
                                    <div className={css.value}>
                                        <div className={css.valueImg}>
                                            <svg width="51" height="51" viewBox="0 0 51 51"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M37.2084 32.8331H34.9042L34.0876 32.0456C37.5876 27.9623 39.3959 22.3914 38.4042 16.4706C37.0334 8.36225 30.2667 1.88725 22.1001 0.895583C9.76255 -0.621084 -0.620779 9.76225 0.895888 22.0998C1.88755 30.2664 8.36256 37.0331 16.4709 38.4039C22.3917 39.3956 27.9626 37.5873 32.0459 34.0873L32.8334 34.9039V37.2081L45.2292 49.6039C46.4251 50.7998 48.3792 50.7998 49.5751 49.6039C50.7709 48.4081 50.7709 46.4539 49.5751 45.2581L37.2084 32.8331ZM19.7084 32.8331C12.4459 32.8331 6.58339 26.9706 6.58339 19.7081C6.58339 12.4456 12.4459 6.58308 19.7084 6.58308C26.9709 6.58308 32.8334 12.4456 32.8334 19.7081C32.8334 26.9706 26.9709 32.8331 19.7084 32.8331Z"
                                                   />
                                            </svg>
                                        </div>
                                        <div className={css.valueText}> Curieux</div>
                                    </div>
                                    <div className={css.value}>
                                        <div className={css.valueImg}>
                                            <svg width="70" height="70" viewBox="0 0 70 70"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M35 43.75C39.8325 43.75 43.75 39.8325 43.75 35C43.75 30.1675 39.8325 26.25 35 26.25C30.1675 26.25 26.25 30.1675 26.25 35C26.25 39.8325 30.1675 43.75 35 43.75Z"
                                                   />
                                                <path
                                                    d="M49.0875 11.6667L43.75 5.83337H26.25L20.9125 11.6667H5.83331V58.3334H64.1666V11.6667H49.0875ZM35 49.5834C26.95 49.5834 20.4166 43.05 20.4166 35C20.4166 26.95 26.95 20.4167 35 20.4167C43.05 20.4167 49.5833 26.95 49.5833 35C49.5833 43.05 43.05 49.5834 35 49.5834Z"
                                                    />
                                            </svg>
                                        </div>
                                        <div className={css.valueText}> Observateur</div>
                                    </div>
                                    <div className={css.value}>
                                        <div className={css.valueImg}>
                                            <svg width="70" height="70" viewBox="0 0 70 70"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M56.8167 36.0209C52.2375 24.1209 35.9334 23.4792 39.8709 6.18342C40.1625 4.90008 38.7917 3.90842 37.6834 4.57925C27.0959 10.8209 19.4834 23.3334 25.8709 39.7251C26.3959 41.0667 24.8209 42.3209 23.6834 41.4459C18.4042 37.4501 17.85 31.7043 18.3167 27.5918C18.4917 26.0751 16.5084 25.3459 15.6625 26.6001C13.6792 29.6334 11.6667 34.5334 11.6667 41.9126C12.775 58.2459 26.5709 63.2626 31.5292 63.9043C38.6167 64.8084 46.2875 63.4959 51.8 58.4501C57.8667 52.8209 60.0834 43.8376 56.8167 36.0209ZM29.75 50.6917C33.95 49.6709 36.1084 46.6376 36.6917 43.9543C37.6542 39.7834 33.8917 35.7001 36.4292 29.1084C37.3917 34.5626 45.9667 37.9751 45.9667 43.9251C46.2 51.3043 38.2084 57.6334 29.75 50.6917Z"
                                                    />
                                            </svg>
                                        </div>
                                        <div className={css.valueText}> Debrouillard</div>
                                    </div>
                                    <div className={css.value}>
                                        <div className={css.valueImg}>
                                            <svg width="70" height="70" viewBox="0 0 70 70"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M35 64.1667C49.4958 64.1667 61.25 52.4126 61.25 37.9167C46.7542 37.9167 35 49.6709 35 64.1667ZM16.3333 29.8959C16.3333 33.9209 19.6 37.1876 23.625 37.1876C25.1708 37.1876 26.5708 36.7209 27.7667 35.9042L27.7083 36.4584C27.7083 40.4834 30.975 43.7501 35 43.7501C39.025 43.7501 42.2917 40.4834 42.2917 36.4584L42.2333 35.9042C43.4 36.7209 44.8292 37.1876 46.375 37.1876C50.4 37.1876 53.6667 33.9209 53.6667 29.8959C53.6667 26.9792 51.9458 24.5001 49.4958 23.3334C51.9458 22.1667 53.6667 19.6876 53.6667 16.7709C53.6667 12.7459 50.4 9.47925 46.375 9.47925C44.8292 9.47925 43.4292 9.94591 42.2333 10.7626L42.2917 10.2084C42.2917 6.18341 39.025 2.91675 35 2.91675C30.975 2.91675 27.7083 6.18341 27.7083 10.2084L27.7667 10.7626C26.6 9.94591 25.1708 9.47925 23.625 9.47925C19.6 9.47925 16.3333 12.7459 16.3333 16.7709C16.3333 19.6876 18.0542 22.1667 20.5042 23.3334C18.0542 24.5001 16.3333 26.9792 16.3333 29.8959ZM35 16.0417C39.025 16.0417 42.2917 19.3084 42.2917 23.3334C42.2917 27.3584 39.025 30.6251 35 30.6251C30.975 30.6251 27.7083 27.3584 27.7083 23.3334C27.7083 19.3084 30.975 16.0417 35 16.0417ZM8.75 37.9167C8.75 52.4126 20.5042 64.1667 35 64.1667C35 49.6709 23.2458 37.9167 8.75 37.9167Z"
                                                   />
                                            </svg>
                                        </div>
                                        <div className={css.valueText}> Calme</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Skills;
