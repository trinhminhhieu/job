import Layout from "../components/Dashboard/Layout";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import MetaData from "../components/Layout/MetaData";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { newBlogpost, clearErrors } from "../actions/blogpostAction";
import { NEW_BLOGPOST_RESET } from "../constants/blogpostConstants";
import { useDropzone } from "react-dropzone";

// Import Quill CSS
import "quill/dist/quill.snow.css";
// Import React và Quill
import "react-quill/dist/quill.snow.css"; // Import quill styles
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import("react-quill"), { ssr: false });

export default function PostBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [uploadedFileName, setUploadedFileName] = useState(""); // State lưu tên tệp đã tải lên
  const [filecloud, setFileCloud] = useState(null);

  //[x] done
  const onDrop = useCallback((acceptedFiles) => {
    // Xử lý các tệp đã được chọn tại đây
    // const uploadedFile = acceptedFiles[0].path;
    const uploadedFileName = acceptedFiles[0];

    // console.log("uploadedFile", uploadedFile);
    setUploadedFileName(uploadedFileName.name); // Cập nhật tên tệp vào state
    setFileCloud(acceptedFiles ? acceptedFiles[0] : null);

    console.log("Accepted files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
    },
  });

  return (
    //NOTE KHI THEM CÁC PAGE FOR ADMIN DASHBOARD BỌC THẺ <div className="jobbox-dashboard"> trước LAYOUT
    <div className="jobbox-dashboard">
      <Layout breadcrumbTitle="My Blog Post" breadcrumbActive="My Blog Post">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-box">
              <div className="container">
                <div className="panel-white mb-30">
                  <div className="box-padding bg-postjob">
                    <h5 className="icon-edu">Create Blog Post</h5>
                    <div className="row mt-30">
                      <div className="col-lg-9">
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group mb-30">
                              <label className="font-sm color-text-mutted mb-10">
                                Blog title *
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                placeholder="e.g. How make money in AI?"
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mb-30">
                              <label className="font-sm color-text-mutted mb-10">
                                Content *
                              </label>
                              {/* <textarea
                                // className="form-control"
                                name="message"
                                rows={10}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at sem id enim suscipit commodo nec in ante. Sed viverra vel leo vitae pharetra. Morbi viverra venenatis neque, eu porttitor diam blandit nec. Etiam et volutpat magna, id molestie quam. Vestibulum vel libero gravida, scelerisque arcu eu, maximus mi. Suspendisse eu dolor lobortis, posuere enim venenatis, posuere quam."
                              /> */}
                              <ReactQuill
                                rows={10}
                                className="form-control-quill"
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at sem id enim suscipit commodo nec in ante. Sed viverra vel leo vitae pharetra. Morbi viverra venenatis neque, eu porttitor diam blandit nec. Etiam et volutpat magna, id molestie quam. Vestibulum vel libero gravida, scelerisque arcu eu, maximus mi. Suspendisse eu dolor lobortis, posuere enim venenatis, posuere quam."
                                modules={{
                                  toolbar: [
                                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                                    ["bold", "italic", "underline", "strike"],
                                    ["link", "image"],
                                    [{ align: [] }],
                                    ["blockquote", "code-block"],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    [{ script: "sub" }, { script: "super" }],
                                    ["clean"], // Thêm "clean" để xóa định dạng
                                  ],
                                }}
                                formats={[
                                  "header",
                                  "bold",
                                  "italic",
                                  "underline",
                                  "strike",
                                  "link",
                                  "image",
                                  "align",
                                  "blockquote",
                                  "code-block",
                                  "list",
                                  "bullet",
                                  "script",
                                  "clean", // Thêm "clean" vào danh sách định dạng
                                ]}
                              />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="form-group mb-30">
                              <div className="box-upload">
                                <div className="add-file-upload">
                                  <input
                                    className="fileupload"
                                    type="file"
                                    name="file"
                                  />
                                </div>
                                <a className="btn btn-default">Upload Image</a>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group mb-30 box-file-uploaded d-flex align-items-center">
                              <span>avatar.png</span>
                              <a className="btn btn-delete">Delete</a>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group mt-10">
                              <button className="btn btn-default btn-brand icon-tick">
                                Submit Post
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
