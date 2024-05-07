"use client";

import React from "react";
import { useAirport } from "../airport.hook";
import { Airport } from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Loader, Trash, XIcon } from "lucide-react";
import { useModal } from "@/hooks/modal-hook";
import { useParams } from "next/navigation";
import { SingleImageDropzone } from "@/components/single-image-drop-zone";
import dynamic from "next/dynamic";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const Editor = dynamic(() => import("../../../../../components/editor"), {
  ssr: false,
});

type Props = { airport: Airport | null };

const AirportForm = ({ airport }: Props) => {
  const {
    form,
    onSubmit,
    imagesFile,
    setImagesFile,
    uploadImages,
    ImagesPlaceholder,
    file,
    setFile,
    ImagePlaceholder,
    uploadImage,
    fileTwo,
    uploadImageTwo,
    setFileTwo,
    ImagePlaceHolderTwo,
    ansRef,
    queRef,
    addFaq,
    deleteFaq,
    edit,setEditFn,cancelEdit
  } = useAirport({ airport });

  const isLoading = form.formState.isSubmitting;

  const { setOpen } = useModal();
  const params = useParams();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px] mt-20 separate">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Airport name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Slug" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add images</FormLabel>
                <div className="flex items-center gap-3 w-full flex-wrap">
                  <FormControl>
                    <SingleImageDropzone
                      width={200}
                      height={200}
                      value={imagesFile}
                      onChange={(imagesFile) => {
                        setImagesFile(imagesFile);
                      }}
                    />
                  </FormControl>
                  <Button
                    disabled={!imagesFile}
                    type="button"
                    onClick={uploadImages}
                  >
                    Upload
                  </Button>
                  <ImagesPlaceholder />
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="mt-20">
          {" "}
          <h3 className="rounded-md bg-white p-1 w-fit border">First Block</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px]  separate">
            <FormField
              control={form.control}
              name="blockOneImage"
              render={({ field }) => (
                <div className="flex gap-4 items-center">
                  <FormItem>
                    <FormLabel>First Block Image*</FormLabel>
                    <FormControl>
                      <SingleImageDropzone
                        width={200}
                        height={200}
                        value={file}
                        onChange={(file) => {
                          setFile(file);
                        }}
                      />
                    </FormControl>
                    <Button
                      disabled={!file || !!form.watch("blockOneImage")}
                      type="button"
                      onClick={() => uploadImage("blockOneImage")}
                    >
                      Upload
                    </Button>

                    <FormMessage />
                  </FormItem>

                  {<ImagePlaceholder type="blockOneImage" />}
                </div>
              )}
            />
               <FormField
            control={form.control}
            name="blockOneImageAlt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Image Alt</FormLabel>
                <FormControl>
                  <Input placeholder="First Image Alt" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="blockOneContent"
                render={({ field }) => (
                  <FormItem className="  w-full px-4  mt-8 separate">
                    <FormLabel>First Blog Content</FormLabel>
                    <FormControl>
                      <Editor
                        onChange={(string) => {
                          form.setValue("blockOneContent", string);
                        }}
                        initialContent={form.getValues("blockOneContent")}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          {" "}
          <h3 className="rounded-md bg-white p-1 w-fit border">Second Block</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1200px]  separate">
            <FormField
              control={form.control}
              name="blockTwoImage"
              render={({ field }) => (
                <div className="flex gap-4 items-center">
                  <FormItem>
                    <FormLabel>Second Block Image*</FormLabel>
                    <FormControl>
                      <SingleImageDropzone
                        width={200}
                        height={200}
                        value={fileTwo}
                        onChange={(fileTwo) => {
                          setFileTwo(fileTwo);
                        }}
                      />
                    </FormControl>
                    <Button
                      disabled={!fileTwo || !!form.watch("blockTwoImage")}
                      type="button"
                      onClick={() => uploadImageTwo("blockTwoImage")}
                    >
                      Upload
                    </Button>

                    <FormMessage />
                  </FormItem>

                  {<ImagePlaceHolderTwo type="blockTwoImage" />}
                </div>
              )}
            />
                <FormField
            control={form.control}
            name="blockTwoImageAlt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second Image Alt</FormLabel>
                <FormControl>
                  <Input placeholder="Second Image Alt" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="blockTwoContent"
                render={({ field }) => (
                  <FormItem className="  w-full px-4  mt-8 separate">
                    <FormLabel>Second Block Content</FormLabel>
                    <FormControl className=" w-full">
                      <Editor
                        onChange={(string) => {
                          form.setValue("blockTwoContent", string);
                        }}
                        initialContent={form.getValues("blockTwoContent")}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="mt-20 bg-background p-8 border rounded-md  hover:shadow-lg transition ">
          <FormField
            control={form.control}
            name="faq"
            render={({ field }) => (
              <FormItem className="  w-full ">
                <FormLabel>Faq</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 w-full">
                    <div className="w-full">

             
                    <div className="flex  gap-1 items-start flex-col">
                      <Input placeholder="Question" ref={queRef} />
                      <Textarea placeholder="Answer" ref={ansRef} />
                    </div>
                    <Button className={cn("mt-4 w-full p-4",edit && 'bg-amber-400 hover:bg-amber-400/70 ')} type="button" onClick={addFaq} >
                     {edit ? "Update FAQ" :  "Add FAQ"}
                    </Button>
                    {edit &&  <Button variant={'secondary'} className={cn("mt-4 w-full p-4")} type="button" onClick={cancelEdit} >
                     Cancel
                    </Button>}
                    </div>
                    {!!form.watch("faq").length && (
                      <div className="mt-4 space-y-4 2xl:mt-0">
                        {form.watch("faq").map((faq, i) => (
                          <div
                            key={i}
                            className={cn("border p-3 rounded-md relative overflow-hidden",(edit && edit.index === i) && 'bg-muted border-blue-500')}
                          >
                            <p className="font-semibold text-lg">
                              {faq.question}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {faq.answer}
                            </p>
                            <div className="flex  w-full mt-8 rounded-xl overflow-hidden">
                            <span onClick={()=>setEditFn(faq.question,faq.answer,i)} className="bg-amber-400 p-4 cursor-pointer flex-1 hover:bg-amber-400/70 transition w-12 h-full flex items-center justify-center ">
                              <Edit className="text-white" size={13}/>
                            </span>
                            <span onClick={()=>deleteFaq(i)} className="bg-rose-400 cursor-pointer p-4 hover:bg-rose-400/70 flex-1 transition w-12 h-full flex items-center justify-center ">
                              <Trash className="text-white" size={13}/>
                            </span>
                              </div>
                           
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="  w-full px-4  mt-20 separate">
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Editor
                  onChange={(string) => {
                    form.setValue("content", string);
                  }}
                  initialContent={form.getValues("content")}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4 mt-4">
          <Button disabled={isLoading} type="submit">
            {airport ? "Update" : "Create"}{" "}
            {isLoading && <Loader className="ml-3 h-3 w-3 animate-spin" />}
          </Button>
          {airport && (
            <Button
              type="button"
              onClick={() =>
                setOpen("delete-modal", {
                  url: `/api/airport/${params.airportId}`,
                })
              }
              variant={"destructive"}
            >
              Delete
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AirportForm;
