# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ApplicationRecord.transaction do
    puts "Destroying tables..."
    # Unnecessary if using `rails db:seed:replant`
    Reaction.destroy_all
    Message.destroy_all
    DirectMessageChannel.destroy_all
    Channel.destroy_all
    User.destroy_all

    puts "Resetting primary keys..."
    # For easy testing, so that after seeding, the first `User` has `id` of 1
    ApplicationRecord.connection.reset_pk_sequence!("users")
    ApplicationRecord.connection.reset_pk_sequence!("direct_message_channels")
    ApplicationRecord.connection.reset_pk_sequence!("channels")
    ApplicationRecord.connection.reset_pk_sequence!("messages")
    ApplicationRecord.connection.reset_pk_sequence!("reactions")

    puts "Creating users..."
    # Create one user with an easy to remember username, email, and password:
    User.create!(
      first_name: "Demo",
      last_name: "Lition",
      email: "demo@user.io",
      password: "password",
    )

    Channel.create!(
      name: "App Academy",
      author_id: 1,
      description: "App Academy"
    )

    
    Channel.create!(
      name: "The Boys",
      author_id: 1,
      description: "The Boys"
    )

    Message.create!(
      body: "TESTING",
      user_id: 1,
      channel_id: 1
    )

    Message.create!(
      body: "TESTING2",
      user_id: 1,
      channel_id: 1
    )

    Message.create!(
      body: "TESTING3",
      user_id: 1,
      channel_id: 1
    )

    Reaction.create!(
      emoji: "smile",
      user_id: 1,
      message_id: 1
    )
    
    Reaction.create!(
      emoji: "thumbs-up",
      user_id: 1,
      message_id: 1
    )
    
    Reaction.create!(
      emoji: "thumbs-down",
      user_id: 1,
      message_id: 1
    )
    
    Reaction.create!(
      emoji: "heart",
      user_id: 1,
      message_id: 1
    )
    
    Reaction.create!(
      emoji: "laughing",
      user_id: 1,
      message_id: 1
    )

    
    puts "Done!"
end