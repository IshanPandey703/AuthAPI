const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  rollNum: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        if (!el.includes("/")) return false;
        regexp = /\//gi;
        const array = [...el.matchAll(regexp)];
        if (array.length < 2) return false;
        const attribute = el.split("/");
        const attribute1 = attribute[0].toUpperCase();
        const allattribute = [
          "BTECH",
          "IMH",
          "IMS",
          "BARC",
          "IHM",
          "BARC",
          "BPH",
          "BHMCT",
          "IED",
          "MCA",
          "MTECH",
        ];
        if (!allattribute.contains(attribute1)) return false;
      },
      message: "Invalid roll number",
    },
  },
  workEditorial: [
    {
      type: mongoose.schema.objectId,
      ref: "naps_blog",
    },
  ],
  workMediaReport: [
    {
      type: mongoose.schema.objectId,
      ref: "naps_blog",
    },
  ],
  workSiteReport: [
    {
      type: mongoose.schema.objectId,
      ref: "naps_blog",
    },
  ],
  designation: {
    type: String,
    enum: {
      values: [
        "Naps-Member",
        "President",
        "Vice President",
        "Editors-In-Chief",
        "Media Head",
        "Epistle Head",
        "Events' Head",
        "Interviews' Head",
        "Technical Head",
        "Senior Executive Member",
        "General Secretary",
        "Joint-Secretary",
        "Treasure",
        "Joint Treasurer",
        "Deputy Editor",
        "Media Coordinator",
        "Epistle Coordinator",
        "Interviews' Coordinator",
        "Events' Coordinator",
        "Design Head",
        "Technical Coordinator",
        "Executive Member",
      ],
      message: "Designation did not match any of the following list",
    },
    default: "Naps-Member",
  },
  profilePhoto: String,
  password: {
    type: String,
    required: true,
    minlength: [8, "A password should have minimum length of 8"],
    select: false,
  },
  cnfrmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return this.password === el;
      },
      message: "Passwords does not match",
    },
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ["stage1", "stage2", "stage3", "owner"],
      message:
        "Role cannot be anything other than stage1, stage2, stage3 or owner",
    },
  },
  active: {
    type: Boolean,
    default: true,
  },
});
userSchema.pre("save", async function (next) {
  // console.log('hi i am in befor e hashing ');
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmpassword = undefined;
  next();
});
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
