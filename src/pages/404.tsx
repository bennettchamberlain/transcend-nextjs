import { StoreLayout } from "@site/layouts/store-layout";
import { NextLink, NextSeo } from "@site/utilities/deps";

export default function Custom404() {
  return (
    <StoreLayout>
      <NextSeo title="404 - Page Not Found" description="The page you're looking for doesn't exist." />

      <div
        className="mx-auto my-20 w-1/2 px-0 py-20 sm:my-10 sm:w-11/12 sm:px-0 sm:py-10 md:my-10 md:w-5/6 md:px-0 md:py-10 lg:my-5 lg:w-1/2 lg:px-0 lg:py-20"
        style={{ margin: "5% 50% 0 25%", width: "50%", display: "block", padding: "80px 0" }}
      >
        <span
          className="text-sm font-medium tracking-widest text-gray-300 uppercase"
          style={{
            textTransform: "uppercase",
            fontSize: "1em",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 500,
            color: "#cecece",
            letterSpacing: "10px",
          }}
        >
          :: CNFG.CNSL
        </span>
        <span
          className="text-sm font-medium tracking-widest text-gray-500 uppercase"
          style={{
            textTransform: "uppercase",
            fontSize: "1em",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 500,
            color: "#626262",
            letterSpacing: "10px",
          }}
        >
          04C
        </span>
        <span
          className="text-sm font-medium tracking-widest text-gray-300 uppercase"
          style={{
            textTransform: "uppercase",
            fontSize: "1em",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 500,
            color: "#cecece",
            letterSpacing: "10px",
          }}
        >
          ::
        </span>
        <br />
        <br />
        <span
          className="text-2xl font-medium tracking-widest text-gray-300 uppercase"
          style={{
            textTransform: "uppercase",
            fontSize: "2em",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 500,
            color: "#cecece",
            letterSpacing: "10px",
          }}
        >
          Status
        </span>
        <span
          className="text-2xl font-medium tracking-widest text-gray-500 uppercase"
          style={{
            textTransform: "uppercase",
            fontSize: "2em",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 500,
            color: "#626262",
            letterSpacing: "10px",
          }}
        >
          not found
        </span>

        <br />
        <br />
        <br />

        {/* Glitch animated ERROR text */}
        <div
          title="ERROR"
          style={{
            position: "relative",
            textTransform: "uppercase",
            fontSize: "7em",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 500,
            color: "#b4100b",
            letterSpacing: "25px",
            animation: "glitch 1s linear infinite",
          }}
        >
          ERROR
        </div>

        <hr
          className="mb-4 border-0 border-t-2 border-white/10"
          style={{
            marginBottom: "1rem",
            border: 0,
            borderTop: "2px solid rgba(255, 255, 255, 0.1)",
          }}
        />

        <span
          className="mr-6 border-2 border-white/10 px-1.5 font-semibold tracking-widest uppercase"
          style={{
            border: "2px solid rgba(255, 255, 255, 0.1)",
            textTransform: "uppercase",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 600,
            letterSpacing: "normal",
            padding: "0px 6px 0px 6px",
            margin: "0px 25px 0px 0px",
            color: "#b4100b",
          }}
        >
          <b>E</b>
        </span>

        <span
          className="mr-6 border-2 border-white/10 px-1.5 font-semibold tracking-widest uppercase"
          style={{
            border: "2px solid rgba(255, 255, 255, 0.1)",
            textTransform: "uppercase",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 600,
            letterSpacing: "7px",
            padding: "0px 6px 0px 6px",
            margin: "0px 25px 0px 0px",
            color: "#000",
            backgroundColor: "#cecece",
          }}
        >
          404 : NOT FOUND
        </span>

        <span
          className="mr-6 border-0 px-1.5 font-semibold tracking-widest uppercase"
          style={{
            border: "0px solid rgba(255, 255, 255, 0.1)",
            textTransform: "uppercase",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 600,
            letterSpacing: "7px",
            padding: "0px 6px 0px 6px",
            margin: "0px 25px 0px -20px",
            color: "#000",
            backgroundColor: "#b4100b",
          }}
        ></span>

        <span
          className="mr-6 border-2 border-white/10 px-1.5 font-semibold tracking-widest uppercase"
          style={{
            border: "2px solid rgba(255, 255, 255, 0.1)",
            textTransform: "uppercase",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 600,
            letterSpacing: "7px",
            padding: "0px 6px 0px 6px",
            margin: "0px 25px 0px 0px",
          }}
        ></span>

        <br />
        <br />
        <br />
        <br />

        <NextLink
          href="/"
          className="text-center text-sm font-medium tracking-widest text-yellow-600 uppercase no-underline hover:text-white hover:line-through"
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            fontSize: "1em",
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 500,
            color: "#c9b311d0",
            letterSpacing: "10px",
            textDecoration: "none",
          }}
        >
          [go back]
        </NextLink>
      </div>

      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style jsx>{`
        @keyframes glitch {
          2%,
          64% {
            transform: translate(2px, 0) skew(0deg);
          }
          4%,
          60% {
            transform: translate(-2px, 0) skew(0deg);
          }
          62% {
            transform: translate(0, 0) skew(5deg);
          }
        }

        @keyframes glitchTop {
          2%,
          64% {
            transform: translate(2px, -2px);
          }
          4%,
          60% {
            transform: translate(-2px, 2px);
          }
          62% {
            transform: translate(13px, -1px) skew(-13deg);
          }
        }

        @keyframes glitchBottom {
          2%,
          64% {
            transform: translate(-2px, 0);
          }
          4%,
          60% {
            transform: translate(-2px, 0);
          }
          62% {
            transform: translate(-22px, 5px) skew(21deg);
          }
        }

        div[title="ERROR"]:before,
        div[title="ERROR"]:after {
          content: attr(title);
          position: absolute;
          left: 0;
        }

        div[title="ERROR"]:before {
          animation: glitchTop 2s linear infinite;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
          -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        div[title="ERROR"]:after {
          animation: glitchBottom 2.5s linear infinite;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
          -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }
      `}</style>
    </StoreLayout>
  );
}
