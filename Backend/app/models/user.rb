class User < ApplicationRecord
    has_secure_password


    validates :email, :password, presence: true
    validates :email, uniqueness: true
    validates :password, length: { minimum: 3 }

    has_many :goals
    has_many :activities
    has_many :consumptions
    has_many :activity_comments
    has_many :consumption_comments

    has_many :follows
    has_many :followed_users, through: :follows
  
    has_many :followers, foreign_key: :followed_user_id, class_name: 'Follow'
    has_many :follower_users, through: :followers, source: :user

    # activity totals

    def total_weekly_activities
        self.activities.select do |activity|
            activity.created_at.strftime('%U') == Time.now.strftime('%U') && activity.created_at.year == Time.now.year
        end
    end


    def total_monthly_activities
        self.activities.select do |activity|
            activity.created_at.month == Time.now.month && activity.created_at.year == Time.now.year
        end
    end

    def total_yearly_activities
        self.activities.select do |activity|
            activity.created_at.year == Time.now.year
        end
    end


    # activity types

    def run_activities
        self.activities.select { |activity| activity.category == "run" }
    end

    def walk_activities
        self.activities.select { |activity| activity.category == "walk" }
    end

    def swim_activities
        self.activities.select { |activity| activity.category == "swim" }
    end

    def bike_activities
        self.activities.select { |activity| activity.category == "bike" }
    end

    # calories burned

    def daily_calories_burned
        daily_calories_burned = 0
        self.activities.each do |activity|
            if (activity.created_at.today?)
                daily_calories_burned += activity.calories_burned 
            end
        end
        return daily_calories_burned
    end


    def weekly_calories_burned
        weekly_calories_burned = 0
          self.activities.each do |activity|
            if (activity.created_at.strftime('%U') == Time.now.strftime('%U') && activity.created_at.year == Time.now.year)
                weekly_calories_burned += activity.calories_burned 
            end
        end
        return weekly_calories_burned
    end


    def monthly_calories_burned
        monthly_calories_burned = 0
          self.activities.each do |activity|
            if (activity.created_at.month === Time.now.month && activity.created_at.year == Time.now.year)
                monthly_calories_burned += activity.calories_burned 
            end
        end
        return monthly_calories_burned
    end

    def yearly_calories_burned
        yearly_calories_burned = 0
          self.activities.each do |activity|
            if (activity.created_at.year === Time.now.year)
                yearly_calories_burned += activity.calories_burned 
            end
        end
        return yearly_calories_burned
    end

    # calories consumed

    def daily_calories_consumed
        daily_total_calories_intaken = 0
          self.consumptions.each do |consumption|
            if (consumption.created_at.today?)
                daily_total_calories_intaken += consumption.calories_intaken 
            end
        end
        return daily_total_calories_intaken
    end


    def weekly_calorie_consumed
        weekly_calories_intaken = 0
          self.consumption.each do |activity|
            if (consumption.created_at.strftime('%U') == Time.now.strftime('%U') && consumption.created_at.year == Time.now.year)
                weekly_total_calories_intaken += consumption.calories_intaken 
            end
        end
        return weekly_calories_intaken
    end

    def monthly_calories_consumed
        monthly_calories_intaken = 0
          self.consumptions.each do |consumption|
            if (consumption.created_at.month === Time.now.month && consumption.created_at.year == Time.now.year)
                monthly_calories_intaken += consumption.calories_intaken 
            end
        end
        return monthly_calories_intaken
    end

    def yearly_calories_consumed
        yearly_calories_intaken = 0
          self.consumptions.each do |consumption|
            if (consumption.created_at.year === Time.now.year)
                yearly_calories_intaken += consumption.calories_intaken 
            end
        end
        return yearly_calories_intaken
    end

    # goal statistics

    def successful_goals
        self.goals.select {|goal| goal.completed == true }
    end

    def goals_to_complete
        self.goals.select { |goal| goal.completed == false }
    end

    # net calorie counting

    def net_daily_calories
        return self.daily_calories_consumed - self.daily_calories_burned
    end

    def net_weekly_calories
        return self.weekly_calorie_consumed - self.weekly_calories_burned
    end

    def net_monthly_calories
        return self.monthly_calories_consumed - self.monthly_calories_burned
    end

    def net_yearly_calories
        return self.yearly_calories_consumed - self.yearly_calories_burned
    end

    #base metabolic rate
    # what user needs to have for basic function
    # Harris–Benedict equation
    #66 + (6.2 x weight) + (12.7 x height) - (6.76 x age) = BMR for men
    #655.1 + (4.35 x weight) + (4.7 x height) - (4.7 x age) = BMR for women

    def basal_metabolic_rate
        return self.gender == "male" ? 66 + ( 6.2 * self.weight ) + ( 12.7 * (self.height).to_f ) - ( 6.76 * self.age) : 655.1 + ( 6.2 * self.weight ) + ( 12.7 * (self.height).to_f ) - ( 6.76 * self.age)
    end




end