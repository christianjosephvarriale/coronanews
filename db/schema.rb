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

ActiveRecord::Schema.define(version: 2020_04_12_190211) do

  create_table "comments", force: :cascade do |t|
    t.string "message"
    t.string "name"
    t.string "email"
    t.string "post"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meta", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "world_stats"
    t.text "world_map"
    t.text "ca_stats"
    t.text "markers"
  end

  create_table "posts", force: :cascade do |t|
    t.string "author"
    t.string "date"
    t.string "headerImg"
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "url"
    t.boolean "featured"
    t.string "region"
    t.string "source"
    t.string "tags"
    t.boolean "production"
    t.string "sentiment"
    t.string "relevance"
    t.string "body"
  end

  create_table "spiders", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subscribers", force: :cascade do |t|
    t.string "countries"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "address"
  end

end
