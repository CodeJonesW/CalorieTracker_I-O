# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_17_221115) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer "user_id"
    t.string "category"
    t.integer "calories_burned"
    t.string "distance"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "activity_comments", force: :cascade do |t|
    t.integer "user_id"
    t.integer "activity_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "consumption_comments", force: :cascade do |t|
    t.integer "user_id"
    t.integer "consumption_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "consumptions", force: :cascade do |t|
    t.integer "user_id"
    t.string "category"
    t.integer "calories_intaken"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "follows", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "followed_user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followed_user_id"], name: "index_follows_on_followed_user_id"
    t.index ["user_id", "followed_user_id"], name: "index_follows_on_user_id_and_followed_user_id", unique: true
    t.index ["user_id"], name: "index_follows_on_user_id"
  end

  create_table "goals", force: :cascade do |t|
    t.integer "user_id"
    t.boolean "completed"
    t.integer "calories_to_burn"
    t.string "distance"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "email"
    t.integer "age"
    t.integer "weight"
    t.string "height"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
