class ExternalApiService
    include HTTParty
    base_uri 'https://cat-fact.herokuapp.com'
  
    def fetch_data
      response = self.class.get('/facts/')
      if response.success?
        response.parsed_response
      else
        handle_error(response)
      end
    end
  
    private
  
    def handle_error(response)
      Rails.logger.error("API request failed with status: #{response.code}")
      nil
    end
  end
  