"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import profileCharacter from "../../../public/avatar.svg";
import "/src/styles/Avatar.css";

import {
  watchViewport,
  unwatchViewport,
  getViewportState,
  recalibrateOrientation,
} from "tornis";

export default function Avatar() {
  var veloPos = 1;
  var dizzyCount = 0;

  const updateValues = ({
    size,
    scroll,
    mouse,
    position,
    orientation,
    devicePixelRatio,
  }) => {
    if (mouse.changed) {
      // do something related to mouse position or velocity
      // console.log(mouse)

      // calculate the distance from the center of the page in percentage
      const x = ((mouse.x - window.innerWidth / 2) / window.innerWidth) * 100;
      const y = ((mouse.y - window.innerHeight / 2) / window.innerHeight) * 100;
      const changeSlowliness = 3;

      // eyes
      const eyeClamp = 7;
      document.getElementById("eyeR").style.transform =
        `translate(${Math.min(eyeClamp, Math.max(-eyeClamp, x / changeSlowliness))}px, ${Math.min(eyeClamp, Math.max(-eyeClamp, y / changeSlowliness))}px)`;
      document.getElementById("eyeL").style.transform =
        `translate(${Math.min(eyeClamp, Math.max(-eyeClamp, x / changeSlowliness))}px, ${Math.min(eyeClamp, Math.max(-eyeClamp, y / changeSlowliness))}px)`;
      document.getElementById("eyR").style.transform =
        `translate(${Math.min(eyeClamp, Math.max(-eyeClamp, x / changeSlowliness))}px, ${Math.min(eyeClamp, Math.max(-eyeClamp, y / changeSlowliness))}px)`;
      document.getElementById("eyL").style.transform =
        `translate(${Math.min(eyeClamp, Math.max(-eyeClamp, x / changeSlowliness))}px, ${Math.min(eyeClamp, Math.max(-eyeClamp, y / changeSlowliness))}px)`;
      document.getElementById("avatar").style.transform =
        `translate(${Math.min(eyeClamp, Math.max(-eyeClamp, x / changeSlowliness))}px, ${Math.min(eyeClamp, Math.max(-eyeClamp, y / changeSlowliness))}px)`;

      // glasses
      const glassesClamp = 3;
      document.getElementById("glasses").style.transform =
        `translate(${Math.min(glassesClamp, Math.max(-glassesClamp, x / changeSlowliness))}px, ${Math.min(glassesClamp, Math.max(-glassesClamp, y / changeSlowliness))}px)`;

      // eyesbrows
      const eyebrowsClamp = 2;
      document.getElementById("eayleachR").style.transform =
        `translate(${Math.min(eyebrowsClamp, Math.max(-eyebrowsClamp, x / changeSlowliness))}px, ${Math.min(eyebrowsClamp, Math.max(-eyebrowsClamp, y / changeSlowliness))}px)`;
      document.getElementById("eayleachL").style.transform =
        `translate(${Math.min(eyebrowsClamp, Math.max(-eyebrowsClamp, x / changeSlowliness))}px, ${Math.min(eyebrowsClamp, Math.max(-eyebrowsClamp, y / changeSlowliness))}px)`;

      // shadow
      const shadowClamp = 2;
      document.getElementById("noseShadow").style.transform =
        `translate(${Math.min(shadowClamp, Math.max(-shadowClamp, x / changeSlowliness))}px, ${Math.min(shadowClamp, Math.max(-shadowClamp, y / changeSlowliness))}px)`;
      document.getElementById("eyeShadow").style.transform =
        `translate(${Math.min(shadowClamp, Math.max(-shadowClamp, x / changeSlowliness))}px, ${Math.min(shadowClamp, Math.max(-shadowClamp, y / changeSlowliness))}px)`;
      document.getElementById("faceShadow").style.transform =
        `translate(${Math.min(shadowClamp, Math.max(-shadowClamp, x / changeSlowliness))}px, ${Math.min(shadowClamp, Math.max(-shadowClamp, y / changeSlowliness))}px)`;

      // head
      const headClamp = 1;
      document.getElementById("head").style.transform =
        `translate(${Math.min(headClamp, Math.max(-headClamp, x / changeSlowliness))}px, ${Math.min(headClamp, Math.max(-headClamp, y / changeSlowliness))}px)`;
      document.getElementById("head").style.transform =
        `rotate(${Math.min(headClamp, Math.max(-headClamp, y / changeSlowliness))}deg)`;
      document.getElementById("neckShadow").style.transform =
        `rotate(${Math.min(headClamp, Math.max(-headClamp, y / changeSlowliness))}deg)`;

      // other
      const otherClamp = 1;
      document.getElementById("mouth2").style.transform =
        `translate(${Math.min(otherClamp, Math.max(-otherClamp, x / changeSlowliness))}px, ${Math.min(otherClamp, Math.max(-otherClamp, y / changeSlowliness))}px)`;
      document.getElementById("mouth2Shadow").style.transform =
        `translate(${Math.min(otherClamp, Math.max(-otherClamp, x / changeSlowliness))}px, ${Math.min(otherClamp, Math.max(-otherClamp, y / changeSlowliness))}px)`;
      document.getElementById("bear").style.transform =
        `translate(0px, ${Math.min(otherClamp, Math.max(-otherClamp, y / changeSlowliness))}px)`;
      document.getElementById("mustache").style.transform =
        `translate(${Math.min(otherClamp, Math.max(-otherClamp, x / changeSlowliness))}px, ${Math.min(otherClamp, Math.max(-otherClamp, y / changeSlowliness))}px)`;

      document.getElementById("particles").style.transform =
        `translate(${Math.min(eyeClamp, Math.max(-eyeClamp, x / changeSlowliness))}px, ${Math.min(eyeClamp, Math.max(-eyeClamp, y / changeSlowliness))}px)`;

      // if high velocity for few seconds, then add a class to the avatar
      var Vy = mouse.velocity.y;
      // check if the sign of Vy has changed from + to - or - to +
      if (Vy * veloPos < 0) {
        veloPos = Vy;
        dizzyCount += 1;

        setTimeout(function () {
          dizzyCount = dizzyCount <= 0 ? 0 : dizzyCount - 1;
        }, 800);
        if (dizzyCount > 4) {
          dizzyCount = 3;
          document.getElementById("Mia").classList.add("dizzy");
          setTimeout(function () {
            document.getElementById("Mia").classList.remove("dizzy");
          }, 4000);
        }
      }
    }
  };

  useEffect(() => {
    watchViewport(updateValues);
  }, []);

  return (
    <>
      {/*<Image*/}
      {/*    src={profileCharacter}*/}
      {/*    alt="CodeBucks"*/}
      {/*    className="w-4/5  xs:w-3/4 md:w-full h-full object-contain object-center"*/}
      {/*    priority*/}
      {/*    sizes="(max-width: 768px) 100vw,(max-width: 1180px) 50vw, 50vw"*/}
      {/*/>*/}

      {/* check if minimum motion activer */}
      <svg
        className="max-w-[50vw] max-h-[80vh] overflow-visible motion-reduce:hidden hidden md:block"
        viewBox="0 0 687 834"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="avatar" clipPath="url(#clip0_7_105)">
          <path
            id="neck"
            d="M269 396V363.5V354L268 343L267 328.5L269 323L281.5 316L357 299.5L430 316V338.5V349L429 366.5V384.5L430 407L432.5 421L436.5 427.5L446.5 437.5L458.5 442.5L448 471.5L405.5 504.5L351.5 516.5L299 500L258 471.5L262.5 450L267 419.5L269 396Z"
            fill="#FBD4AA"
          />
          <path
            id="neckShadow"
            d="M270.5 362L268 340.5L272 342.5L277.5 345.5L284.5 350.5L291 354.5L296.5 359L303 363L310.5 368.5L318 372.5L328 376.5L339 378.5L348 379H358H367L377.5 376.5L385.5 374.5L393 370L398.5 367L403 363L406.5 360.5H413V366L412.5 370.5L411.5 376.5L409.5 382.5L407.5 388.5L404.5 395L401 403L396.5 409.5L393 414L386.5 420.5L380 425.5L374 428L370 428.5H366L362.5 428L359 427L353.5 422L346.5 417L336.5 408.5L328 402L320 398L316.5 397H314.5L314 399L315.5 404L318.5 411L321.5 418.5L326 429.5L327 433.5L328 437.5L327 439.5L325 440.5L320.5 439.5L314 434.5L302.5 423.5L291.5 408.5L280.5 389L274.5 374.5L270.5 362Z"
            fill="#B17C6C"
          />
          <path
            id="tshirt"
            d="M280.5 456L251 445L228.5 484L239.5 520L271 551L335 561L416 546L469.5 521L480 479L456 435.5L442.5 442L423 453.5L405.5 460L383.5 464.5H363.5H342.5L307 462L280.5 456Z"
            fill="#DC9442"
          />
          <path
            id="veste"
            d="M2 770.5V794L14 804L26.5 810L37.5 812L49 810L64.5 801L82.5 785L98.5 768L114.5 754L127.5 746.5L137.5 743H150L164.5 748.5L176 758L195 776L216.5 797L229.5 806L240 810.5L250 812L261.5 809.5L275.5 801.5L284 795L293 785.5L304.5 774.5L311.5 767L322.5 756.5L338 747L346 743.5L360.5 742.5L371.5 746.5L381.5 752L393.5 762.5L405 774L419 788L434 801.5L445.5 808.5L457 811.5H468L482 805.5L497 794L515.5 776L531 759.5L543 751L554.5 744.5L564.5 742.5L577 743.5L590 750L604 761L621 778.5L639.5 796.5L652.5 806L666.5 811.5H676.5L682.5 810.5L683 800.5L682.5 783.5L682 773.5L681 759.5L679.5 748.5L678 735L676.5 726L674 709L672.5 702.5L670 691L668 681L665 671L664.5 665.5L663.5 657L662 646L660.5 639L657.5 625L653 606L647 588.5L642.5 577.5L636.5 564L630.5 552.5L620.5 537.5L613 528.5L600.5 517.5L589.5 509L575 500L567.5 495L555 489L544 484L533.5 480L528.5 478.5L529 477L531 473.5L534 468.5L535.5 466.5L535 462L533.5 456L531 449L527.5 441.5L522 432.5L518 427.5L514.5 423.5L515.5 421.5L518 415L520 409L522 401.5L522.5 397L521.5 388L517 379.5L512.5 374L506.5 368.5L496.5 362.5L487 358.5L474 353.5L462.5 350L448 345.5L439 342.5L433.5 340.5L430 343.5L429.5 347.5V355L429 368V380V393.5L429.5 400L430 407.5L431 413L432 418L432.5 420.5L434 424L438.5 430L442 434L447 437.5L448.5 439L447.5 442.5L445.5 448L443 453.5L439 462.5L435 470L431.5 477L427 484L423 489.5L420 491.5L414.5 494.5L403.5 500L393 504.5L381.5 509.5L368.5 514.5L355.5 519L349.5 521.5L347 520.5L342 518L333.5 513L325.5 507L317 500L306.5 490L300 483L292.5 474L288.5 468.5L287.5 464L284 454L281.5 444.5L278 430.5L275 419.5L272 408.5L270.5 402V395L270 384V376L269.5 363L269 354L268.5 345.5L268 341.5L267 340H264L259 340.5L251.5 342L243 345L238.5 347L234 349.5L229 353L225 357L222 361L220.5 363.5L218.5 367.5L216.5 372.5L215.5 377.5L215 383.5L215.5 389V392.5L214 396L210.5 401L207.5 406L204.5 411.5L202 416.5L201 421.5L200.5 428L201 432.5L201.5 436L198.5 439.5L195.5 442.5L191.5 446.5L188 450.5L183 456L181 459.5L178.5 465.5L177.5 469.5V476.5L175 477L165.5 479.5L151.5 484.5L138 490L121.5 498.5L102.5 511.5L87 524.5L73.5 539L62.5 554L53 570L45.5 586.5L39.5 602.5L33 623L28.5 640L24.5 661L23 667L18 683L11.5 709.5L6 738.5L2 770.5Z"
            fill="#36434C"
          />
          <g id="particles">
            <circle id="p24" cx="148.5" cy="670.5" r="7" fill="white" />
            <circle
              id="p23"
              cx="220.676"
              cy="656.676"
              r="3.82329"
              transform="rotate(5.57136 220.676 656.676)"
              fill="white"
            />
            <circle
              id="p22"
              cx="99.1765"
              cy="729.176"
              r="3.82329"
              transform="rotate(5.57136 99.1765 729.176)"
              fill="white"
            />
            <circle
              id="p21"
              cx="268.677"
              cy="760.676"
              r="1.70076"
              transform="rotate(5.57136 268.677 760.676)"
              fill="white"
            />
            <circle
              id="p20"
              cx="198.358"
              cy="740.358"
              r="1.70076"
              transform="rotate(5.57136 198.358 740.358)"
              fill="white"
            />
            <circle
              id="p19"
              cx="333.214"
              cy="697.214"
              r="2.97906"
              transform="rotate(4.70709 333.214 697.214)"
              fill="white"
            />
            <circle
              id="p18"
              cx="435.813"
              cy="776.813"
              r="1.68083"
              transform="rotate(4.70709 435.813 776.813)"
              fill="white"
            />
            <circle
              id="p17"
              cx="571.313"
              cy="690.313"
              r="1.68083"
              transform="rotate(4.70709 571.313 690.313)"
              fill="white"
            />
            <circle
              id="p16"
              cx="621.313"
              cy="747.313"
              r="1.68083"
              transform="rotate(4.70709 621.313 747.313)"
              fill="white"
            />
            <circle
              id="p15"
              cx="89.6765"
              cy="645.676"
              r="0.794449"
              transform="rotate(7.30395 89.6765 645.676)"
              fill="white"
            />
            <circle
              id="p14"
              cx="249.389"
              cy="694.389"
              r="0.794449"
              transform="rotate(7.30395 249.389 694.389)"
              fill="white"
            />
            <circle
              id="p13"
              cx="63.3891"
              cy="688.389"
              r="2.84557"
              transform="rotate(7.30395 63.3891 688.389)"
              fill="white"
            />
            <circle
              id="p12"
              cx="100.694"
              cy="628.694"
              r="4.5"
              transform="rotate(99.706 100.694 628.694)"
              fill="white"
            />
            <circle
              id="p11"
              cx="225.23"
              cy="684.494"
              r="7.5"
              transform="rotate(99.706 225.23 684.494)"
              fill="white"
            />
            <circle
              id="p10"
              cx="473.445"
              cy="592.644"
              r="8.75202"
              transform="rotate(100.038 473.445 592.644)"
              fill="white"
            />
            <circle
              id="p9"
              cx="577.412"
              cy="715.412"
              r="5.10098"
              transform="rotate(100.038 577.412 715.412)"
              fill="white"
            />
            <circle
              id="p8"
              cx="581.412"
              cy="699.412"
              r="2.7075"
              transform="rotate(100.038 581.412 699.412)"
              fill="white"
            />
            <circle
              id="p7"
              cx="620.638"
              cy="687.638"
              r="1.63513"
              transform="rotate(100.038 620.638 687.638)"
              fill="white"
            />
            <circle
              id="p6"
              cx="627.667"
              cy="652.266"
              r="0.895227"
              transform="rotate(100.038 627.667 652.266)"
              fill="white"
            />
            <circle
              id="p5"
              cx="523.469"
              cy="636.416"
              r="14.3783"
              transform="rotate(100.038 523.469 636.416)"
              fill="white"
            />
            <circle
              id="p4"
              cx="455.696"
              cy="669.696"
              r="5.6263"
              transform="rotate(-160.256 455.696 669.696)"
              fill="white"
            />
            <circle
              id="p3"
              cx="375.696"
              cy="546.696"
              r="3.01429"
              transform="rotate(-160.256 375.696 546.696)"
              fill="white"
            />
            <circle
              id="p2"
              cx="214.355"
              cy="544.355"
              r="2.06736"
              transform="rotate(-160.256 214.355 544.355)"
              fill="white"
            />
            <circle
              id="p1"
              cx="418.494"
              cy="694.494"
              r="9.37716"
              transform="rotate(-160.256 418.494 694.494)"
              fill="white"
            />
          </g>
          <g id="head">
            <path
              id="earR"
              d="M461.5 222L457 225.5L453.5 231L451.5 239.5L444.5 250V272.5L448.5 277.5V285.5L452.5 286.5L456.5 288L460.5 287L464 285.5L466 283.5L469 281L470.5 277.5L473.5 272L475 265L476 257.5L478 251L479.5 242.5L480.5 235L480 231L478 226.5L476 223L469.5 218L463.5 218.5H462L461.5 222Z"
              fill="#EDC4AA"
            />
            <g id="earRShadow">
              <path
                d="M467 241.5L466.935 246L466.63 249.5L466 254L466.935 253.151L468.152 249.145L469.37 243.907L471.196 238.052L470.5 235L469.065 232.198L465.413 229L463.5 227.5H461L462.978 229.733L463.891 230.657L465.413 233.122L466.63 236.82L467 241.5Z"
                fill="#B17C6C"
              />
              <path
                d="M453.543 251.61L453 248L452.63 251.919L452.326 257.157L452.022 262.087L450.5 272L450 275.5V279L451.413 280.884L453.239 281.5H455.37L455.978 278.11C456.181 275.645 456.587 270.653 456.587 270.407V266.093L455.978 260.547L455.065 256.233L453.543 251.61Z"
                fill="#B17C6C"
              />
            </g>
            <path
              id="earL"
              d="M229.5 216.5H233L237.5 220L244 231.5L251 244V266.5L247 271.5L244.5 278.5L243 280.5H238.5H235L231.5 279.5L229.5 277.5L226.5 275L225 271.5L223 265.5L221 258.5L219.5 251.5L217.5 245L216 236.5L215 229L215.5 225L217.5 220.5L219.5 217L221.5 215.5H224.5H227.5L229.5 216.5Z"
              fill="#EDC4AA"
            />
            <g id="earRShadow_2">
              <path
                d="M224.657 236.5L224.722 241L225.023 244.5L225.648 249L224.722 248.151L223.515 244.145L222.309 238.907L220.5 233.052L221.189 230L222.611 227.198L226.229 224L228.125 222.5H230.602L228.642 224.733L227.737 225.657L226.229 228.122L225.023 231.82L224.657 236.5Z"
                fill="#B17C6C"
              />
              <path
                d="M237.989 246.61L238.528 243L238.894 246.919L239.195 252.157L239.497 257.087L241.005 267L241.5 270.5V274L240.1 275.884L238.291 276.5H236.18L235.577 273.11C235.376 270.645 234.974 265.653 234.974 265.407V261.093L235.577 255.547L236.482 251.233L237.989 246.61Z"
                fill="#B17C6C"
              />
            </g>
            <path
              id="face"
              d="M231.5 154.5L233 198.5L239.5 236.5L243.5 259L250.5 287.5L261 313.5L275.5 333.5L297.5 353.5L318.5 364L347 371.5L372.5 368L408 357.5L427.5 341L438 317L447.5 276L452 244L457.5 209V175.5L455 141.5L443 98.5L419 71L377.5 53.5L319.5 57.5L274.5 82L241.5 114L231.5 154.5Z"
              fill="#FBD4AA"
            />
            <path
              id="faceShadow"
              d="M242.5 253.5L241 260.5L240 254.5L237.897 230L237 212.5V194L237.897 179.5L241 158.5L245.5 139L265 120L282 110L306.5 97.5L337 86L332.5 103L327.5 108.5L325.5 105.5L311.5 120L298 126L287.5 130.5L285.5 144.5L281.5 149L271 162L265 173L260 184L255 190L252 197.5L249.5 204L247 212V219.5L248.5 238.5L245.5 248L242.5 253.5Z"
              fill="#B17C6C"
            />
            <path
              id="bear"
              d="M237 237.5L236.5 230L238 229L239.5 227L240 227.5V230L241 233L242 237L243 241L244 244L244.5 247.5L245.5 250L247.5 252.5L248.5 253.5L248 254.5L247 256.5V259L247.5 261.5L249 266L250 267.5L251 266.5V267.5V270L252 272.5L253 268V276L254.5 278L256 280.5V278L257 276.5L258 280.5L259 285.5L259.5 289L260.5 292.5L262 290V292.5L263.5 291L264 299H264.5L265.5 296L266 297.5L266.5 301L268 304.5L269.5 299.5V307L271 304V309.5L273 306V308.5L274 307.5V313L275 313.5L276 310.5L276.5 318L277.5 320L278.5 313L279 318.5L280.5 316.5L281 321.5L282.5 326L283 323.5L284 321L284.5 327.5L285.5 329.5L286.5 324L287 327.5L287.5 330L289 332.5L290 328.5L291.5 335L292.5 335.5L293 331.5L294.5 337L295.5 335L296.5 338L297.5 334L298.5 340L299.5 342L300 336.5L302 343L303 340.5L305 347L305.5 341L308.5 347L309.5 341L310.5 347L312 344L313.5 346.5L314.5 344L315.5 347L316.5 346.5L317.5 344.5L319.5 347L320 344.5L322 350L322.5 347L323.5 345L325.5 349L326.5 346L328.5 349L329 349.5L329.5 346.5L333.5 351.5L334 346.5L336.5 350.5L336 346L337.5 348.5L338 346.5L339.5 349L340 346L342 349.5L342.5 347L344.5 350L345.5 346.5L347 349.5L347.5 350L348.5 346.5L350 349.5L350.5 347L352.5 349.5L353.5 345.5L355.5 352.5L357 346.5L359 350L360.5 346L362 349.5L363 347L364.5 349.5L365 350L365.5 346L368.5 350L369.5 346.5L371.5 350L372.5 347L376 351L376.5 347.5L379.5 350.5L380 347L382 350.5L383 346.5L384.5 350H385.5L386.5 346L388.5 349H389.5L391 344.5L392 348.5L393 349L394 345L396 349L398 343.5L399 349H400L402 343.5L403.5 348L407 342.5V346.5L409 343.5V346.5L410.5 345L413 341L413.5 345L415 342.5L418 336.5V341.5L421 336.5L425 330V333L428.5 326.5L430 320.5L433 310.5L436.5 299L440.5 287L443 277L446 267L447.5 262.5L449 255L450 247.5V243L452.5 234.5L453 243V254L451.5 268L449 282.5L446 299L444 309L440.5 324L439 332L430.5 343.5L425 351L417 359L412 361.5L404.5 362L400.5 366L395.5 370L387 375L377.5 378L369 380.5H356H339L324 378L309.5 372L297 363L284 354L270.5 345L264 339L258.5 331L252.5 317L249.5 306.5L245 287.5L240 259L237 237.5Z"
              fill="#36434C"
            />
            <g id="mustache">
              <path
                d="M302 275V287.5L302.5 288.5L305.5 285V286.5L308 283V286.5L309.5 285L310 286.5L312.5 283.5L314.5 282L315 284L317.5 281L318 283L320.5 280.5L321.5 281L323 280.5H324L327 277.5L327.5 279L329.5 276.5L330 277.5L332.5 276.5L333 277.5H334L335 276L336.5 274.5L337 275.5L340 274.5L342.5 271.5L344 272L346.5 268.5L344.5 267.5H341V265.5L336.5 269.5C336 269.333 335.1 268.9 335.5 268.5C335.9 268.1 334.667 268 334 268L328 271V269L323 272.5L321 270.5L316.5 274.5L315.5 273.5L311 277.5L309.5 273.5L303.5 279.5L302 275Z"
                fill="#36434C"
              />
              <path
                d="M356 272L355 268.5L356.5 267L357 265.5L358.5 267L359.5 265.5L360 267.5L360.5 266.5L362 268.5L362.5 266.5L364 268.5V266.5L365 268.5L366.5 269.5L368 268.5L370.5 270.5L371.5 269L374.5 272L375.5 270.5L377.5 273L378.5 272L381 274.5L381.5 272.5L383 274.5L383.5 273.5L385 275.5L385.5 273.5L389.5 278.5V277L391.5 279.5L392.5 278.5L394 279.5V283.5L393 286L391.5 284L390.5 284.5L388.5 282.5V284L387.5 283.5L386 282L385 283L384 281.5V283L383 282.5L381.5 281L380.5 282L378.5 280.5L376 279.5L375.5 281L374 279.5V280.5L372.5 280L369.5 278L368.5 279L366.5 277H364.5L362 274.5L361 275L359 272.5L358.5 273.5L357 273L356 272Z"
                fill="#36434C"
              />
            </g>
            <path
              id="hair"
              d="M239.5 228L236.5 230.5V226.5L236 223.5L235 219.5L233.5 216.5H231L229.5 216L229 213.5L228 210V204L226 201L221.5 195.5V190C221.5 189.6 220.833 186.167 220.5 184.5L218 178L217 172L216 165.5L215 162L213.5 158L212.5 152.5L212 148L211 146.5L208 145L204.5 142L201 138.5L199.5 135L197.5 130.5L196.5 126L195 120L195.5 112.5L196 117L196.5 121L198 124.5L198.5 121L199.2 119.6L198.5 119L197 115.5L196.5 111L197.5 108.5L198.565 107.587L198.5 107L199 104L201.5 99.5L200.5 104.5L200.344 106.062L201 105.5L204.5 103L207 101.5L210 100L209.5 99V97L208 94.5L210 96.5L211 98L212 97L211 96L209 95L207.5 92.5L207.429 92.2143L203.5 96.5L199 102L200.5 98.5L204.5 93L207.132 91.0263L207 90.5L206 88V86.9L204 87.5L201.5 90.5L200 94L199 99.5L198.5 94.5L200.5 89.5L203 85.5L206 84.25V83V80L207 76V80.5L209 79L211.5 77L215.5 76.5L217.5 77.5L216 78L212 79L209.5 80.5L209.233 82.3667L209.833 82.6667L211.5 82L216 80.5L219 80L222 81.5L220.5 80L219 78L217.5 76L216 74L215.5 70L216 66L216.5 68L219 70.5L220.5 73.5L219.5 73L221 76L223.5 78.5L225 78L222 75L221 72L220.5 70L221 67L221.5 65L222.5 63L224 61.5L226.5 60L231.5 59L230.5 59.5L228 60.5L226 63.5L224.5 66.5L223.5 71.5L225.5 73.5L227 74.1429V71.5L229.5 66.5L231.069 64.8103L231.5 60.5L235 53L238.5 49L239.591 48.4545L240 47.5L243 44.5L252 41.5L259 41L260.5 40.5L263 38.5L266 35.5L270 32.5L271.5 31.5L273.5 31H276.5L279 31.5L281.5 32H283L284 31.5L285.5 29.5L287.5 27.5L290.5 25L293.5 22.5L296.5 19.5L299.5 17.5L303 15.5L307 14L311 12.5L315.5 11.5H318.5L320 11L318 10L315.5 9H308.5L303 10.5L297 14L292 18.5L287 24L281 31L282 29.5L283.5 27L285 24.5L287.5 21L289.5 18L292 15.5L294 13L296 11.5L300 9.5L302.5 7.5L305 7L308 6H311.5H316L319.5 6.5L323 7.5L326 9L328.5 11L330 11.5H333L335 12L339.5 13.5L342.5 15L344.5 15.5V15L342 13L338 11L333 8L329.5 7L324 5.5L318.5 4L315 3.5L314.5 3L317.5 2.5L321 3L324.5 3.5L328 4.5L331.5 5.5L336 7L340 9L343.5 11L347.5 14L349.5 16L350.5 18L352 19.5L355 21L356 21.5L356.5 21V18L356 16L354.5 13L351 10.5L348.5 9L344.5 8L339 6.5H341H345.5L347.5 7L349.5 7.5L352.5 8.5L355 10L356.5 12L358 13.5L359 16.5V19L359.5 21L360.5 20V17.5V14L358.5 10.5L357 7.5L354 4.5L350.5 2.5L347.5 1L347 0L349.5 0.5L353 1.5L356 3L360.5 6L362.5 8.5L364.5 11.5L365.5 15.5V18H366.5H368.5H372L375 19.5L377 21L378 21.5L380 20.5L384.5 19L387.5 18.5L389 18L394.5 17.5H398.5L401.5 18L405 19L409 20.5L405 18L402.5 17L397 15.5L391 14.5H396L401 15.5L404 16L401.5 14.5L396.5 12.5L390.5 10.5L386.5 9.5L386 9H386.5H391L395 10L399.5 11.5L403 13L406.5 14.5L411.5 18L415 20.5L418.5 24.5L420.5 27C421 27.8333 422 29.6 422 30C422 30.4 422.667 32.5 423 33.5L424 34L426 37.5L427.5 41L429.5 44L431.5 48.5L432.5 52.5L433 54.5L433.5 54V50L432.5 47L431 41L429 37.5L427 34L425 31L424 28.5L425.5 29.5L427 31.5L429 34.5L430.5 37L432.5 40.5L433.5 44L435 49L435.5 53.5L436 60.5V63H437L437.5 62L438 60L438.5 57L439 54.5L439.5 50L439 46L438.5 41.5L438 38L437.5 35L436.5 31.5L435 28.5L433.5 25L431 22L426.5 17.5L422.5 14.5L419.5 13L419 12L423 13.5L428 16L431.5 19L435 22L438 26L440 30L441.5 35.5L443 40V39L443.5 31L444 39V43V52.5V56.5L443.5 60L443 62.5H444L444.5 62L446.5 60L448.5 58L450 56.5L452 54.5L453.5 54L452.5 55.5L451 58L447.5 61.5L445 64V66V67L447 68.5L447.5 70L450 69.5L452 69L460 65L463.5 63.5H464.5L456.5 68.5L454.5 70H455.5L459 69.5L462.5 69L466.5 68L471 66L476.5 63L480 60.5L482 59.5L481.5 60.5L475.5 65.5L469.5 69.5L463.5 71.5L458.754 72.2302L458 76L457.304 79.942L459 79L464.5 77L471 74.5L473.5 73.5L473 74.5L467.5 78L458.5 82.5L456.713 83.2943L456.5 84.5L456 90V93L458 95.5L461 100L466 104L471 109L477.5 115.5C478.333 116.333 480 118.1 480 118.5C480 118.9 482.333 122 483.5 123.5V124.5L483 124L479 121.5L475.5 119.5L470.5 118H466.5L469 120L472.5 123L477.5 128.5L481 134.5L482 137.5L479 135.5L475.5 132.5L472 130L468.5 129L471 133.5L474 138.5L475 141.5L473 140L470.5 138L471.5 141L472.5 144.5L473 149.5L474 153.5L473.5 153L471.5 151.5L470.5 150.5L471.5 154L472.5 157.5V170V183.5L472 188L471 193.5L470 199.5L468 205L466 210.5L463.5 215L461.5 217L462.5 219V221L461 223L456.5 226L453.5 230L452 237.5L451.5 244.5L449.5 242.5L449 235V230.5L449.5 225.5L450.5 218.5V214.5V207.5L449.5 196V190L449 180L448 173.5V170L447 164.5L444.5 160.5L443.5 155.5L443 152V145V141.5L443.5 137V132L443 127.5L442 123.5L441.5 121L440 117L438.5 113L436 109L434.5 107L434 108L433 110L432 111.5H430.5L428.5 110.5L427.5 108.5L427 106V103.5L426.5 102L424 104.5L423 105L422 104V100L422.5 97L423 94L423.5 91L422 89.5L419 87.5L415 85.5L411 85L405.5 84.5L402.5 85L398 86.5L398.5 85.5L401.5 84L404.5 83L406.5 82L402 81.5H397.5L393 80.5L387.5 79.5L383 78.5L379.5 77.5L375 76L372 74.5L368 72.5L366 71.5L365.5 72L363 74L361 76L358 77.5L355 79.5L352 81L349 82L346 82.5L343.5 83L341 84L339 86L337 88.5L335.5 91L334.5 94L333 96.5L331.5 100L331 102.5L329 104L328.5 103.5L327.5 102L326.5 99.5L325.5 96.5L324.5 93.5L324 94L323 96L322.5 98L321.5 100L321 101H319.5H318L317.5 101.5L316 103L314 105L311.5 107.5L308.5 109.5L305.5 111.5L302 112.5L298 113.5L294.5 114L290.5 115L287 116.5L285 117.5L282.5 119L280 121.5L278 124.5L277.5 126V130.5V133L278 136.5L279 139.5L280 143L279.5 142.5L278 140.5L277 137.5L276.5 135L276 133L275 129L274 125.5L273.5 122L271.5 124L269.5 126L268.5 128V131V135V137.5L268 141L266.5 139L265.5 137L265 135V132L264.5 132.5L264 133L263 134.5L262.5 136.5L263 139L264 141.5L265.5 144L267.5 146.5H266.5L264.5 146L262.5 145L260 143.5L258 142.5L255.5 140.5L253.5 138L252 135.5V138L252.5 141L253.5 143L255 145L257 147L259 148.5L262 150L264.5 151L263 151.5L260 151L257.5 150.5L254.5 149.5L252 148L250 146L248.5 143L248 145.5L247 151L246 159.5L244.5 169.5V176L243.5 185.5L242.5 192L242 202L241.5 208.5L243.5 211.5L244 215.5V221.5L243.5 222.5H242L240.5 223.5L240 225L239.5 228Z"
              fill="#36434C"
            />
            <path
              id="mouth2"
              d="M312 309L308.5 314L311.5 312.5L316 309.5L321.5 307L329.5 303.5L337.5 302.5L346 302L353 302.5L355.282 301L362.5 299.5L369.5 300.5L379.773 304.5L389 306.5H393.5L392 304.5L387.5 301L380 296L374 292L367.5 288.5L361.5 287.5L358.5 289L354.5 292L351 293.5H348L345 292L341 290.5H337.5L333 292.5L326.5 296L319 302L312 309Z"
              fill="#74341C"
            />
            <path
              id="mouth2Shadow"
              d="M331 308.5C329.167 307.5 325.4 305.5 325 305.5L329.5 304L337 302.5H348.5H353L356.5 301L361.5 299.5L368 300L375 302L377.5 303.5L375 305L370 308L366 311L362 314.5L359 318V320.5L357.5 320L353 319.5L348.5 320L344.5 321H342L341.5 318.5V315.5L337.5 312L331 308.5Z"
              fill="#B17C6C"
            />
            <path
              id="noseShadow"
              d="M313 166L315.5 170.5L317 176.5L318 181L318.5 186.5V193L319 198.5V205V206.5L320.5 208.5L321 211V217V223L320.5 231L319 238L318 247V252.5L319 255L320.5 257L325 259.5L333 261L340.5 262L345.5 265L346.5 266.5L347.5 270.5L350 274L353 276.5H357L359 275L360.5 270.5L362 264L363 262L368 261L372.5 260L376.5 258.5L379 257L380.5 255L379.5 253.5L375.5 248.5L368.5 243.5L360.5 239.5L351 238H342.5L334.5 239L334 237.5L335.5 232L337.5 225L338 218V208.5V200.5L337.5 193L335.5 185L332.5 176.5L329.5 171.5L327 168L324.5 166.5H321L316.5 166H313Z"
              fill="#B17C6C"
            />
            <g id="noseHole">
              <path
                d="M357.292 247.196L355.167 246.5L355.521 247.543L356.938 248.935L359.417 250.674L362.25 252.065L364.729 252.761L366.5 253.109L366.146 251.717L364.729 249.63L362.604 248.587L360.479 247.891L357.292 247.196Z"
                fill="#5D3D41"
              />
              <path
                d="M342.062 251.37L341 252.065L338.875 253.109L336.75 253.804L334.271 254.5H332.5V254.152L333.562 252.761L334.271 251.717L335.333 250.674L337.104 249.63L338.875 248.935L340.292 248.587L342.062 247.891L343.479 247.543L344.188 247.196L343.833 248.935L343.125 250.326L342.062 251.37Z"
                fill="#5D3D41"
              />
            </g>
            <path
              id="eayleachL"
              d="M298 164.244L305 165.221H309.789L316 165.5L318.139 165.709L319.5 165.5L321 165.221L321.5 164.733L323.5 165.709L324.5 165.221L326.5 165L327.207 163L327.207 160.337L325.5 161.5V160.337H324.285V158.081L322.201 158.803H321.201L321.5 157L319 157.895L319.5 153.5L318 156L316.5 152.5L315 155.942L314.5 154.5L312.5 155L311 154.5L309 154.477L304 153.5H294L288.5 153.988L283.5 155L280 156.5L274.5 160L270.5 163.5L266 167.174L261.5 171.57L259.5 174.5L265 171.081L273.5 167.174L281 165.221L289.5 164.244H298Z"
              fill="#36434C"
            />
            <path
              id="eayleachR"
              d="M400.5 167L393.5 168L389 168.5H383.5L382.5 166.5L379.5 168L378 168.5L377 167.5L375 168.5L374 168L373 169L371 166V164L372.5 164.5L373 163L374 161.5L375.5 163L376.5 161.5H377.5V160L379.5 160.5L380 158L381.5 159.5L382 157L383.5 158.5L384 156L386 158L386.5 157.5L389.5 157L397.5 156.5L404.5 156L410 156.5L414.5 157L418.5 158.5L423.5 161L428 165L432.5 170L437 174.5L439 177.5L433.5 174L425 170L417.5 168L409 167H400.5Z"
              fill="#36434C"
            />
            <path
              id="eyeShadow"
              d="M372.5 215.5L378.5 218.5H379L383.5 217.5L391 216H397.5L404.5 215.5H408.5H418.5L428.5 216H434L432.5 215L424.5 213.5L419.5 212.5L411.5 210.5L403.5 206L400.5 204.5L396.5 202.5L394 200.5L393 197V193L393.5 189.5L394.5 186.5L396 183L398 180L401.5 177L404.5 174.5L408.5 172.5H419.5L417 170L415 169.5L407.5 168H394L385.5 169L376 171L372.5 172.5L367.5 177L365.5 180L364.5 186.5V193L365.5 199V206L368.5 211.5L372.5 215.5Z"
              fill="#B17C6C"
            />
            <path
              id="eyL"
              d="M400.608 188.139L409.709 187.482L414.282 186.905L421.391 186.062L428.049 184.675L433.213 183.149L431.222 182.963L424.159 183.308L418.637 183.294L411.667 182.643L406.642 182.676L400.17 182.072L395.643 182.151L389.935 184.129L385.72 186.246L382.5 188.457L391.056 188.251L400.608 188.139Z"
              fill="#74341C"
            />
            <path
              id="eyR"
              d="M293.119 190.86L313.642 191.999L313.616 190.499L308.572 188.087L301.512 184.711L290.496 183.906L279.015 185.108L269.561 187.775L262.624 191.398L293.119 190.86Z"
              fill="#74341C"
            />
            <g id="glasses">
              <path
                id="glassEye"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M407.5 247.5C430.144 247.5 448.5 229.144 448.5 206.5C448.5 183.856 430.144 165.5 407.5 165.5C384.856 165.5 366.5 183.856 366.5 206.5C366.5 229.144 384.856 247.5 407.5 247.5ZM407.5 244.5C428.487 244.5 445.5 227.487 445.5 206.5C445.5 185.513 428.487 168.5 407.5 168.5C386.513 168.5 369.5 185.513 369.5 206.5C369.5 227.487 386.513 244.5 407.5 244.5Z"
                fill="#DC9442"
              />
              <path
                id="glassEye_2"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M289.5 255.5C312.144 255.5 330.5 237.144 330.5 214.5C330.5 191.856 312.144 173.5 289.5 173.5C266.856 173.5 248.5 191.856 248.5 214.5C248.5 237.144 266.856 255.5 289.5 255.5ZM289.5 252.5C310.487 252.5 327.5 235.487 327.5 214.5C327.5 193.513 310.487 176.5 289.5 176.5C268.513 176.5 251.5 193.513 251.5 214.5C251.5 235.487 268.513 252.5 289.5 252.5Z"
                fill="#DC9442"
              />
              <path
                id="glassLink"
                d="M330 194.5L327 197L326 198.5L328 203L329 201.5L330 200L332.5 198L335.5 196.5L338.5 195L342 193.5L346 193L351 192.5H354.5L358.5 193L362.5 193.5L365.5 194.5L367.5 195.5L368.5 196.5L369.5 194L368 193L366 191.5L363.5 190.5L359.5 189.5L355 189H349.5L346 189.5L341 190.5L337 191.5L334.5 192.5L330 194.5Z"
                fill="#DC9442"
              />
            </g>
            <g id="eyeL">
              <circle id="pupilleL" cx="287" cy="203" r="11" fill="#74341C" />
              <circle id="shineL" cx="292" cy="198" r="3" fill="white" />
            </g>
            <g id="eyeR">
              <circle id="pupilleR" cx="410" cy="201" r="11" fill="#74341C" />
              <circle id="shineR" cx="414" cy="196" r="3" fill="white" />
            </g>
            <g id="Mia">
              <g id="miaEar">
                <path
                  id="Vector 25"
                  d="M414.5 60.5L474.5 2L456.5 106"
                  stroke="black"
                  strokeWidth="5"
                />
                <path
                  id="Vector 26"
                  d="M279.5 61L205 2L222 101.5"
                  stroke="black"
                  strokeWidth="5"
                />
              </g>
              <g id="miaMustache">
                <path
                  id="Vector 19"
                  d="M406 267L571 201"
                  stroke="black"
                  strokeWidth="5"
                />
                <path
                  id="Vector 20"
                  d="M411 281.074L588.704 282.547"
                  stroke="black"
                  strokeWidth="5"
                />
                <path
                  id="Vector 21"
                  d="M411 296.912L580.28 350.998"
                  stroke="black"
                  strokeWidth="5"
                />
                <path
                  id="Vector 22"
                  d="M290.296 265L124.296 199"
                  stroke="black"
                  strokeWidth="5"
                />
                <path
                  id="Vector 23"
                  d="M285.252 279.074L106 280.547"
                  stroke="black"
                  strokeWidth="5"
                />
                <path
                  id="Vector 24"
                  d="M285.252 294.912L114.498 348.998"
                  stroke="black"
                  strokeWidth="5"
                />
              </g>
            </g>
          </g>
        </g>
        <defs>
          <clipPath id="clip0_7_105">
            <rect width="687" height="834" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}