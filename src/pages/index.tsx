import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BrainCircuit,
  Github,
  Instagram,
  Linkedin,
  Lock,
  LucidePlayCircle,
  MoveRight,
  PenSquare,
  Twitter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar/Navbar";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import styles from "../styles/homepage.module.scss";

const Home = () => {
  const { data } = useSession();

  return (
    <main>
      <Navbar />
      <section className="relative overflow-hidden">
        <img
          src="./hero-bg.svg"
          alt="Hero"
          className="absolute inset-0 z-[-1] h-screen w-screen"
        />
        <div className="container flex h-[90vh] flex-col items-center justify-center">
          <h1 className="mb-6 flex items-center text-center text-lg font-bold tracking-tighter text-white xl:text-3xl/none">
            <img
              src="./dx-logo.svg"
              alt="Doxshare"
              className="mr-2 h-10 w-10"
            />
            doxshare
          </h1>
          <h1 className="mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-center text-3xl font-bold tracking-tighter text-transparent sm:text-4xl xl:text-6xl/none">
            Share Your Ideas,
            <span className={styles["text-gradient"]}>Seamlessly</span>
          </h1>
          <p className="w-full text-center text-[#888] sm:text-[20px] md:w-[50vw] md:text-[24px]">
            Doxshare streamlines collaboration, making it effortless to bring
            your vision to life through seamless document sharing.
          </p>
          <div className="cta my-6 flex">
            <Link href={`/${data?.user ? "/app" : "/auth"}`}>
              <Button className="mr-4 flex items-center">
                Get Started
                <MoveRight className="ml-2" />
              </Button>
            </Link>
            <Button variant="ghost" className="flex items-center">
              <LucidePlayCircle className="mr-2 h-6 w-6" />
              View Demo
            </Button>
          </div>
        </div>
      </section>
      <section className="flex h-auto items-center sm:p-12">
        <div className="container">
          <h1
            data-count="2"
            className={clsx(
              "mb-8 break-normal bg-gradient-to-r from-white to-gray-500 bg-clip-text text-center text-2xl font-bold tracking-tighter text-transparent xl:text-[40px]/none",
              styles["header-count"],
            )}
          >
            Write when inspiration strikes
          </h1>
          <p className="mx-auto w-full text-center text-[#888] sm:text-[20px] md:w-[50vw]">
            Easily create awesome rich text documents and share with your
            colleagues and friends.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle className="flex items-center break-words text-xl">
                  <PenSquare className="mr-2 h-8 w-8 rounded-md bg-[#999] p-2 text-[#444]" />
                  Easy & Simple
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#888]">
                Just login into the app, and start creating and sharing
                documents!
              </CardContent>
            </Card>
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle className="flex items-center break-words text-xl">
                  <PenSquare className="mr-2 h-8 w-8 rounded-md bg-[#999] p-2 text-[#444]" />
                  Rich text Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#888]">
                Easily create and share rich text documents on the go!
              </CardContent>
            </Card>
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle className="flex items-center break-words text-xl">
                  <Lock className="mr-2 h-8 w-8 rounded-md bg-[#999] p-2 text-[#444]" />
                  Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#888]">
                Password protect your documents so that your privacy isn't
                invaded
              </CardContent>
            </Card>
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle className="flex items-center break-words text-xl">
                  <BrainCircuit className="mr-2 h-8 w-8 rounded-md bg-[#999] p-2 text-[#444]" />
                  AI autocompletion
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#888]">
                Take GPT's help to create your documents in efficient manner.
              </CardContent>
            </Card>
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle className="flex items-center break-words text-xl">
                  <BrainCircuit className="mr-2 h-8 w-8 rounded-md bg-[#999] p-2 text-[#444]" />
                  Analytics (coming soon)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#888]">
                Visualize your documents analytics
              </CardContent>
            </Card>
            <Card className={styles.card}>
              <CardHeader>
                <CardTitle className="flex items-center break-words text-xl">
                  <BrainCircuit className="mr-2 h-8 w-8 rounded-md bg-[#999] p-2 text-[#444]" />
                  Collaborative Environment (coming soon)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-[#888]">
                Invite your friends and colleagues to edit the document with you
                in realtime!
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="my-12 h-auto sm:p-12">
        <div className="container">
          <h1
            data-count="2"
            className={clsx(
              "mb-8 break-normal bg-gradient-to-r from-white to-gray-500 bg-clip-text text-center text-2xl font-bold tracking-tighter text-transparent xl:text-[40px]/none",
              styles["header-count"],
            )}
          >
            Share, Share, Share
          </h1>
          <p className="mx-auto w-full text-center text-[#888] sm:w-[50vw] sm:text-[20px]">
            Generate a shareable link and a QR Code and share the documents with
            your friends or keep it for your own personal use!
          </p>
          <div className="demo-img relative mt-7">
            <span className="absolute left-1/2 z-[-1] mt-6 h-[300px] w-[50%] -translate-x-1/2 bg-gradient-to-r from-blue-500 to-pink-500 blur-[200px] xl:h-[700px] xl:blur-[400px]"></span>
            <img src="./demo.png" alt="Demo" className="mx-auto w-full" />
          </div>
        </div>
      </section>
      <section className="relative my-12 h-auto p-4 md:p-12">
        <div className="mx-auto w-full sm:w-[80%] md:w-[60%]">
          <img
            src="./hero-bg.svg"
            alt="Hero"
            className="absolute inset-0 z-[-1] h-screen w-screen"
          />
          <h1 className="mb-8 break-normal bg-gradient-to-r from-white to-gray-500 bg-clip-text text-center text-2xl font-bold tracking-tighter text-transparent xl:text-[40px]/none">
            Meet the creator
          </h1>
          <div className="h-full w-full grid-cols-2 rounded-md border bg-gray-400 bg-opacity-10 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter sm:p-12 xl:grid">
            <img
              src="./shaan.png"
              alt="Shaan Alam"
              className="circle-shape h-[100px] w-[100px] rounded-full border-4 border-white object-cover sm:h-[150px] sm:w-[150px] xl:h-[300px] xl:w-[300px]"
            />
            <div className="creator-text circle-shape">
              <h1 className="mt-4 text-4xl font-bold tracking-tighter xl:mt-0">
                Shaan Alam
              </h1>
              <p className="my-8 leading-7 text-[#888]">
                Hello 👋 <br /> I am Shaan Alam, a proficient Front End
                Developer. I am highly passionate about creating products
                through code. The purpose of this project was to create
                something that can be used by others in real world. I did enjoy
                creating this project and I'll be delivering more interesting
                projects in the future.
              </p>
            </div>
            <div className="socials mt-6 flex items-center">
              <a
                href="https://instagram.com/shaancodes"
                className="mr-4"
                rel="noreferrer"
                target="_blank"
              >
                <Instagram className="h-10 w-10 rounded-full p-2 text-gray-500 hover:bg-gray-700 hover:text-white" />
              </a>
              <a
                href="https://github.com/shaan-alam"
                className="mr-4"
                rel="noreferrer"
                target="_blank"
              >
                <Github className="h-10 w-10 rounded-full p-2 text-gray-500 hover:bg-gray-700 hover:text-white" />
              </a>
              <a
                href="https://twitter.com/shaancodes"
                className="mr-4"
                rel="noreferrer"
                target="_blank"
              >
                <Twitter className="h-10 w-10 rounded-full p-2 text-gray-500 hover:bg-gray-700 hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/shaan-alam-01784018a/"
                className="mr-4"
                rel="noreferrer"
                target="_blank"
              >
                <Linkedin className="h-10 w-10 rounded-full p-2 text-gray-500 hover:bg-gray-700 hover:text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <footer className="relative overflow-hidden border-t bg-background p-4 xl:p-12">
        <div className="mx-auto sm:w-[80%] xl:w-[60%]">
          <div className="justify-between xl:flex">
            <div className="grid-left mb-8 xl:mb-0">
              <h1 className="text-4xl font-bold tracking-tighter text-white">
                doxshare
              </h1>
            </div>
            <div className="socials">
              <h1 className="text-2xl font-bold tracking-tighter">
                Social Links
              </h1>
              <div className="links">
                <ul>
                  <li className="my-2 text-[#888] transition-colors hover:text-white">
                    <a
                      href="https://github.com/shaan-alam/doxshare"
                      className="mr-4"
                      rel="noreferrer"
                      target="_blank"
                    >
                      GitHub
                    </a>
                  </li>
                  <li className="my-2 text-[#888] transition-colors hover:text-white">
                    <a
                      href="https://twitter.com/shaancodes"
                      className="mr-4"
                      rel="noreferrer"
                      target="_blank"
                    >
                      X
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Home;
